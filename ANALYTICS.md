# Umami Analytics Setup

## Services Running

- **Umami Analytics Dashboard**: http://localhost:3010
- **PostgreSQL Database**: Internal (port 5432)

## Initial Setup

1. **Login to Umami**:
   - URL: http://localhost:3010
   - Username: `admin`
   - Password: `umami`

2. **Change Default Password**:
   - Go to Settings → Profile
   - Change password from default

3. **Add Your Website**:
   - Go to Settings → Websites
   - Click "Add website"
   - Name: `HarzStorage Local`
   - Domain: `localhost:3000`
   - Click "Save"

4. **Get Tracking Code**:
   - Click on your website name
   - Copy the tracking code that looks like:
   ```html
   <script defer src="http://localhost:3010/script.js" data-website-id="YOUR-WEBSITE-ID"></script>
   ```

5. **Add to Your App**:
   - Add the tracking script to your Next.js app
   - Place it in `app/layout.tsx` or create an Analytics component

## Running Your App

Now you can run your development stack:

```bash
# Start Umami (already running)
docker-compose -f docker-compose.analytics.yml up -d

# Start your app with mock API
npm run dev:full
```

Your app will run on:
- **Frontend**: http://localhost:3000
- **Mock API**: http://localhost:3001
- **Umami Analytics**: http://localhost:3010

## Environment Variables

For production, set:
```bash
UMAMI_APP_SECRET=your-secure-random-secret
```
