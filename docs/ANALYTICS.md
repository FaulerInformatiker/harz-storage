# Analytics Setup - Umami Self-Hosted

## Overview

This project uses **Umami** - a privacy-focused, GDPR-compliant analytics solution that tracks page visits without cookies or personal data collection.

## Self-Hosted Setup

### Local Development

1. **Start Umami with Docker Compose:**
```bash
docker-compose -f docker-compose.analytics.yml up -d
```

2. **Access Umami Dashboard:**
- URL: http://localhost:3000
- Default login: `admin` / `umami`

3. **Configure Website:**
- Click "Add website"
- Name: `HarzStorage Local`
- Domain: `localhost:3000` (your Next.js dev server)
- Copy the generated Website ID

4. **Set Environment Variable:**
```bash
# .env.local
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id-here
```

5. **Start Next.js:**
```bash
npm run dev
```

### Production Infrastructure

#### Kubernetes Deployment

Add to your Helm chart (`helm/templates/umami-deployment.yaml`):

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: umami
spec:
  replicas: 1
  selector:
    matchLabels:
      app: umami
  template:
    metadata:
      labels:
        app: umami
    spec:
      containers:
      - name: umami
        image: ghcr.io/umami-software/umami:postgresql-latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          value: "postgresql://umami:umami@postgres:5432/umami"
        - name: DATABASE_TYPE
          value: "postgresql"
        - name: APP_SECRET
          valueFrom:
            secretKeyRef:
              name: umami-secret
              key: app-secret
---
apiVersion: v1
kind: Service
metadata:
  name: umami
spec:
  selector:
    app: umami
  ports:
  - port: 3000
    targetPort: 3000
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: umami
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts:
    - analytics.yourdomain.com
    secretName: umami-tls
  rules:
  - host: analytics.yourdomain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: umami
            port:
              number: 3000
```

#### PostgreSQL Database

Add to Helm chart (`helm/templates/postgres-deployment.yaml`):

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:15-alpine
        ports:
        - containerPort: 5432
        env:
        - name: POSTGRES_DB
          value: "umami"
        - name: POSTGRES_USER
          value: "umami"
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: postgres-secret
              key: password
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data
      volumes:
      - name: postgres-storage
        persistentVolumeClaim:
          claimName: postgres-pvc
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
```

#### Secrets

Create secrets for production:

```bash
# Create app secret (random 32-character string)
kubectl create secret generic umami-secret \
  --from-literal=app-secret=$(openssl rand -hex 32)

# Create database password
kubectl create secret generic postgres-secret \
  --from-literal=password=$(openssl rand -base64 32)
```

### Environment Configuration

#### Development
```bash
# .env.local
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-local-website-id
```

#### Production
```bash
# .env.production
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-production-website-id
```

## Website Configuration

### Add Website in Umami

1. **Login to Umami Dashboard**
2. **Click "Add website"**
3. **Configure:**
   - **Name**: `HarzStorage Production`
   - **Domain**: `yourdomain.com`
   - **Enable share URL**: No (keep private)

4. **Copy Website ID** from the settings

### Multiple Environments

Create separate websites for each environment:

- **Local**: `localhost:3000`
- **Staging**: `staging.yourdomain.com`
- **Production**: `yourdomain.com`

Each gets its own Website ID for separate analytics.

## Analytics Features

### Automatic Tracking

The Analytics component automatically tracks:
- ✅ Page views
- ✅ Unique visitors
- ✅ Session duration
- ✅ Bounce rate
- ✅ Referrer sources
- ✅ Device/browser info
- ✅ Geographic data

### Custom Events

Track contact form submissions:

```typescript
// In Contact.tsx
const handleSubmit = async (data: ContactFormData) => {
  // ... form submission logic
  
  // Track successful submission
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track('contact-form-submit', {
      size: data.size,
      source: 'contact-page'
    });
  }
};
```

Add to `types/umami.d.ts`:
```typescript
declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, any>) => void;
    };
  }
}
```

## Security & Privacy

### GDPR Compliance
- ✅ No cookies used
- ✅ No personal data collected
- ✅ IP addresses anonymized
- ✅ Data stored in EU (if using EU hosting)
- ✅ No third-party data sharing

### Security Headers

Already configured in `next.config.js`:
```javascript
// Analytics domain allowed in CSP
'connect-src': 'self analytics.yourdomain.com'
```

## Monitoring & Maintenance

### Health Checks

Add to monitoring:
```bash
# Check Umami health
curl -f http://analytics.yourdomain.com/api/heartbeat

# Check database connection
kubectl exec -it postgres-pod -- pg_isready -U umami
```

### Backup Strategy

```bash
# Database backup
kubectl exec postgres-pod -- pg_dump -U umami umami > umami-backup-$(date +%Y%m%d).sql

# Restore from backup
kubectl exec -i postgres-pod -- psql -U umami umami < umami-backup.sql
```

### Log Monitoring

```bash
# View Umami logs
kubectl logs -f deployment/umami

# View database logs
kubectl logs -f deployment/postgres
```

## Troubleshooting

### Common Issues

**Analytics not loading:**
```bash
# Check environment variable
echo $NEXT_PUBLIC_UMAMI_WEBSITE_ID

# Check network connectivity
curl -I http://analytics.yourdomain.com/script.js
```

**Database connection issues:**
```bash
# Check PostgreSQL status
kubectl get pods -l app=postgres

# Test database connection
kubectl exec -it postgres-pod -- psql -U umami -d umami -c "SELECT version();"
```

**Website not tracking:**
1. Verify Website ID matches environment
2. Check domain configuration in Umami
3. Ensure script loads without errors in browser console

### Performance Optimization

**Database tuning** (`postgres.conf`):
```
shared_buffers = 256MB
effective_cache_size = 1GB
maintenance_work_mem = 64MB
checkpoint_completion_target = 0.9
```

**Umami optimization**:
- Enable gzip compression
- Set up CDN for script delivery
- Configure proper caching headers

## Migration from Cloud

If switching from Umami Cloud:

1. **Export data** from cloud dashboard
2. **Import to self-hosted** via API
3. **Update environment variable**
4. **Verify tracking continues**

## Cost Estimation

**Infrastructure costs** (monthly):
- **Database**: ~$10-20 (managed PostgreSQL)
- **Compute**: ~$5-15 (small container)
- **Storage**: ~$1-5 (10GB)
- **Total**: ~$16-40/month

**vs Umami Cloud**: Free (but data hosted externally)
