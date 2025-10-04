# Deployment Documentation

## Overview

The HarzStorage website is built with Next.js and can be deployed to various platforms. This guide covers deployment options and configuration.

## Build Process

### Local Build

```bash
# Install dependencies
npm install

# Create production build
npm run build

# Start production server
npm run start
```

### Build Output

- Static files in `.next/static/`
- Server-side code in `.next/server/`
- Optimized images and assets

## Deployment Platforms

### Vercel (Recommended)

#### Automatic Deployment

1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on git push

#### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

#### Configuration

File: `vercel.json`

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### Netlify

#### Build Settings

- **Build Command**: `npm run build`
- **Publish Directory**: `.next`
- **Node Version**: 18.x

#### Configuration

File: `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### AWS Amplify

#### Build Settings

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - "**/*"
  cache:
    paths:
      - node_modules/**/*
```

### Docker Deployment

#### Dockerfile

```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["npm", "start"]
```

#### Docker Commands

```bash
# Build image
docker build -t harz-storage .

# Run container
docker run -p 3000:3000 harz-storage
```

## Environment Variables

### Development

```env
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Production

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.harzstorage.de
DATABASE_URL=postgresql://...
SMTP_HOST=smtp.example.com
SMTP_USER=noreply@harzstorage.de
SMTP_PASS=password
```

### Platform Configuration

#### Vercel

Set in Vercel dashboard or via CLI:

```bash
vercel env add NEXT_PUBLIC_API_URL
```

#### Netlify

Set in Netlify dashboard or `netlify.toml`:

```toml
[build.environment]
  NEXT_PUBLIC_API_URL = "https://api.harzstorage.de"
```

## API Configuration

### Development API

- Mock server on `localhost:3001`
- JSON Server with mock data
- No authentication required

### Production API

- Real API endpoints
- Authentication/authorization
- Rate limiting and security

### API Service Configuration

File: `lib/api.ts`

```typescript
const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : process.env.NEXT_PUBLIC_API_URL || "/api";
```

## Performance Optimization

### Next.js Optimizations

- Automatic code splitting
- Image optimization with `next/image`
- Static generation where possible
- Bundle analysis with `@next/bundle-analyzer`

### Build Optimizations

```bash
# Analyze bundle size
npm install --save-dev @next/bundle-analyzer

# Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // Next.js config
})

# Run analysis
ANALYZE=true npm run build
```

### CDN Configuration

- Static assets served from CDN
- Image optimization and caching
- Gzip/Brotli compression

## Security Configuration

### Headers

File: `next.config.js`

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};
```

### HTTPS

- Force HTTPS in production
- HSTS headers
- Secure cookies

## Monitoring and Analytics

### Error Tracking

- Sentry integration
- Error boundaries
- Performance monitoring

### Analytics

- Google Analytics
- Core Web Vitals tracking
- User behavior analysis

### Health Checks

```typescript
// pages/api/health.ts
export default function handler(req, res) {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}
```

## Backup and Recovery

### Database Backups

- Automated daily backups
- Point-in-time recovery
- Cross-region replication

### Static Assets

- CDN backup strategy
- Version control for assets
- Rollback procedures

## Deployment Checklist

### Pre-Deployment

- [ ] Run all tests (`npm test && npm run test:e2e`)
- [ ] Build successfully (`npm run build`)
- [ ] Environment variables configured
- [ ] API endpoints updated
- [ ] Security headers configured

### Post-Deployment

- [ ] Health check passes
- [ ] Contact form works
- [ ] Language switching works
- [ ] Mobile responsiveness verified
- [ ] Performance metrics acceptable
- [ ] Error tracking active

### Rollback Plan

- [ ] Previous version tagged
- [ ] Database migration rollback ready
- [ ] CDN cache invalidation plan
- [ ] Monitoring alerts configured
