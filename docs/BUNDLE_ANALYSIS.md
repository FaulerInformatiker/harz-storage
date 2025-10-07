# Bundle Analysis

This project includes comprehensive bundle analysis tools to monitor and optimize JavaScript bundle sizes.

## Tools Integrated

### 1. Next.js Bundle Analyzer
- **Purpose**: Visual analysis of bundle composition
- **Usage**: `npm run analyze`
- **Output**: Interactive HTML reports showing bundle breakdown

### 2. Size Limit
- **Purpose**: Enforce bundle size limits in CI/CD
- **Configuration**: `.size-limit.json`
- **Usage**: `npm run size`

## Bundle Size Limits

Current limits defined in `.size-limit.json`:
- **Client-side bundle**: 200 KB
- **Main page bundle**: 50 KB  
- **All static assets**: 500 KB

## Commands

```bash
# Generate bundle analysis report
npm run analyze

# Check bundle size limits
npm run size

# Analyze why bundle is large
npm run size:why

# Analyze server bundle only
npm run analyze:server

# Analyze browser bundle only  
npm run analyze:browser
```

## CI/CD Integration

Bundle analysis runs automatically on:
- Pull requests to main
- Pushes to main branch

The workflow will:
1. Build the application
2. Check size limits (fails if exceeded)
3. Generate analysis reports
4. Upload artifacts for review

## Optimization Tips

1. **Code Splitting**: Use dynamic imports for large components
2. **Tree Shaking**: Ensure unused code is eliminated
3. **Bundle Analysis**: Review reports to identify large dependencies
4. **Size Monitoring**: Monitor bundle size trends over time

## Viewing Reports

After running `npm run analyze`:
1. Open `.next/analyze/client.html` for client bundle
2. Open `.next/analyze/server.html` for server bundle
3. Review interactive treemap visualization
