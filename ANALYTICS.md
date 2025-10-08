# Analytics Integration

This project uses Umami for privacy-focused web analytics.

## Local Development

Start the local Umami instance:

```bash
docker-compose -f docker-compose.analytics.yml up -d
```

Access Umami at http://localhost:3001:
- Username: admin
- Password: umami

## Configuration

1. Create a website in Umami dashboard
2. Copy the website ID and tracking script URL
3. Update `components/Analytics.tsx` with your values:
   - `src`: Your Umami tracking script URL
   - `data-website-id`: Your website ID from Umami

## Production Deployment

The Analytics component only loads in production (`NODE_ENV=production`).

Update the script URL in `Analytics.tsx` to point to your production Umami instance.

## Privacy

Umami is GDPR compliant and doesn't use cookies or collect personal data.
