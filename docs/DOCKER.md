# Docker Documentation

## Overview

The HarzStorage application is fully containerized with Docker for consistent deployment across environments.

## Docker Images

### Production Image
- **Base**: Node.js 18 Alpine Linux
- **Size**: ~150MB (optimized multi-stage build)
- **Security**: Non-root user, minimal attack surface
- **Performance**: Standalone Next.js output for optimal startup

### Development Image
- **Base**: Node.js 18 Alpine Linux
- **Features**: Hot reload, volume mounting, development tools
- **Usage**: Local development with live code changes

## Quick Start

### Production Deployment
```bash
# Build and run production container
npm run docker:build
npm run docker:run

# Or use Docker Compose
npm run docker:prod
```

### Development Environment
```bash
# Start development environment with hot reload
npm run docker:dev
```

## Docker Commands

### Building Images
```bash
# Production build
docker build -t harz-storage .

# Development build
docker build -f Dockerfile.dev -t harz-storage:dev .
```

### Running Containers
```bash
# Production container
docker run -p 3000:3000 harz-storage

# Development container with volume mounting
docker run -p 3000:3000 -v $(pwd):/app harz-storage:dev
```

### Docker Compose
```bash
# Production stack (app + mock API)
docker-compose up --build

# Development stack with hot reload
docker-compose -f docker-compose.dev.yml up --build

# Stop all services
docker-compose down
```

## Container Configuration

### Environment Variables
```bash
NODE_ENV=production          # Runtime environment
NEXT_TELEMETRY_DISABLED=1   # Disable Next.js telemetry
PORT=3000                   # Application port
HOSTNAME=0.0.0.0           # Bind to all interfaces
```

### Health Checks
```bash
# Container health check
wget --no-verbose --tries=1 --spider http://localhost:3000/

# Docker Compose health monitoring
healthcheck:
  test: ["CMD", "wget", "--spider", "http://localhost:3000/"]
  interval: 30s
  timeout: 10s
  retries: 3
```

### Security Features
- **Non-root user**: Runs as `nextjs` user (UID 1001)
- **Minimal base**: Alpine Linux for reduced attack surface
- **Read-only filesystem**: Application files owned by nextjs user
- **No shell access**: Production container has minimal tools

## Multi-Stage Build

### Stage 1: Dependencies
```dockerfile
FROM node:18-alpine AS deps
COPY package*.json ./
RUN npm ci
```

### Stage 2: Builder
```dockerfile
FROM node:18-alpine AS builder
COPY . .
RUN npm run build
```

### Stage 3: Runtime
```dockerfile
FROM node:18-alpine AS runner
# Copy only production artifacts
# Run as non-root user
```

## Volume Mounts

### Development
```yaml
volumes:
  - .:/app                    # Source code
  - /app/node_modules        # Preserve node_modules
  - /app/.next               # Preserve Next.js cache
```

### Production Data
```yaml
volumes:
  - ./data:/app/data         # Persistent data
  - ./logs:/app/logs         # Application logs
```

## Networking

### Port Configuration
- **Application**: 3000 (HTTP)
- **Mock API**: 3001 (Development only)

### Service Communication
```yaml
services:
  app:
    depends_on:
      - mock-api
    environment:
      - API_URL=http://mock-api:80
```

## Performance Optimization

### Image Size Reduction
- Multi-stage build eliminates dev dependencies
- Alpine Linux base image (~5MB vs ~100MB)
- Standalone Next.js output removes unnecessary files
- .dockerignore excludes development files

### Runtime Performance
- Pre-built static assets
- Optimized Node.js startup
- Minimal memory footprint
- Fast container startup (<2 seconds)

## Deployment Strategies

### Single Container
```bash
docker run -d \
  --name harz-storage \
  --restart unless-stopped \
  -p 3000:3000 \
  harz-storage
```

### Docker Compose Stack
```bash
# Production deployment
docker-compose up -d

# Scaling (if needed)
docker-compose up -d --scale app=3
```

### Container Orchestration
- **Kubernetes**: Ready for K8s deployment
- **Docker Swarm**: Supports swarm mode
- **AWS ECS**: Compatible with ECS task definitions
- **Azure Container Instances**: Direct deployment support

## Monitoring & Logging

### Container Logs
```bash
# View application logs
docker logs harz-storage

# Follow logs in real-time
docker logs -f harz-storage

# Docker Compose logs
docker-compose logs -f app
```

### Health Monitoring
```bash
# Check container health
docker inspect --format='{{.State.Health.Status}}' harz-storage

# Container resource usage
docker stats harz-storage
```

## Troubleshooting

### Common Issues

**Build Failures**
```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker build --no-cache -t harz-storage .
```

**Permission Issues**
```bash
# Fix file permissions
sudo chown -R $(id -u):$(id -g) .

# Check container user
docker exec harz-storage id
```

**Network Connectivity**
```bash
# Test container networking
docker exec harz-storage wget -qO- http://localhost:3000

# Check port binding
docker port harz-storage
```

### Debug Mode
```bash
# Run container with shell access
docker run -it --entrypoint /bin/sh harz-storage

# Debug development container
docker-compose -f docker-compose.dev.yml exec app sh
```

## Security Best Practices

### Container Security
- Non-root user execution
- Minimal base image (Alpine)
- No unnecessary packages
- Read-only root filesystem where possible

### Image Security
- Regular base image updates
- Vulnerability scanning with `docker scan`
- Multi-stage builds to reduce attack surface
- Secrets management via environment variables

### Runtime Security
```bash
# Run with security options
docker run --security-opt=no-new-privileges \
  --read-only \
  --tmpfs /tmp \
  harz-storage
```

## CI/CD Integration

### GitHub Actions
```yaml
- name: Build Docker Image
  run: docker build -t harz-storage .

- name: Test Container
  run: |
    docker run -d -p 3000:3000 harz-storage
    sleep 10
    curl -f http://localhost:3000
```

### Registry Push
```bash
# Tag for registry
docker tag harz-storage:latest registry.example.com/harz-storage:latest

# Push to registry
docker push registry.example.com/harz-storage:latest
```

## Production Deployment

### Environment Setup
```bash
# Create production environment file
cat > .env.production << EOF
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
API_URL=https://api.harzstorage.de
EOF
```

### Load Balancer Configuration
```nginx
upstream harz-storage {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
}

server {
    listen 80;
    server_name harzstorage.de;
    location / {
        proxy_pass http://harz-storage;
    }
}
```
