# Lighthouse Performance Standards - Amazon Q Rules

## 🎯 Target Scores (Production Build)
- **Performance: ≥99%** (Current: 99%)
- **Accessibility: ≥96%** (Current: 96%) 
- **Best Practices: 100%** (Current: 100%)
- **SEO: 100%** (Current: 100%)

## 🚀 Performance Rules (99% Target)

### Critical Performance Patterns
- **Always use Next.js Image component** with proper `sizes` attribute
- **Lazy load images** below the fold
- **Minimize JavaScript bundles** - avoid unnecessary dependencies
- **Use static generation** where possible over server-side rendering
- **Implement proper caching headers** in next.config.js

### Code Patterns to Maintain
```javascript
// ✅ Correct image usage
<Image 
  src="/image.jpg" 
  alt="Description" 
  width={800} 
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
  priority={isAboveFold}
/>

// ✅ Conditional script loading
{process.env.NODE_ENV === 'development' && (
  <Script src="http://localhost:3010/script.js" />
)}
```

## ♿ Accessibility Rules (96% Target)

### Color Contrast Requirements
- **Text contrast ratio: ≥4.5:1** for normal text
- **Large text contrast ratio: ≥3:1** for 18pt+ text
- **Use tools to verify**: WebAIM Contrast Checker

### Safe Color Combinations
```css
/* ✅ High contrast combinations */
.light-theme { color: #1e293b; background: #ffffff; } /* 16.75:1 */
.dark-theme { color: #f8fafc; background: #0f172a; } /* 18.7:1 */
.emerald-button { color: #ffffff; background: #15803d; } /* 4.5:1+ */

/* ❌ Avoid these combinations */
.bad-contrast { color: #ffffff; background: #22c55e; } /* 2.4:1 - fails */
```

### Accessibility Checklist
- **Alt text** for all images (descriptive, not decorative)
- **ARIA labels** for interactive elements
- **Semantic HTML** structure (h1→h2→h3 hierarchy)
- **Focus management** for keyboard navigation
- **Form labels** properly associated with inputs

## ✅ Best Practices Rules (100% Target)

### Console Error Prevention
- **No console errors** in production builds
- **Conditional external scripts** (analytics, tracking)
- **Proper error boundaries** for React components
- **Handle network failures** gracefully

### Security Headers
```javascript
// next.config.js security headers
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' }
];
```

### Code Quality Standards
- **No deprecated APIs** or React patterns
- **Proper TypeScript types** for all props and functions
- **Error handling** for async operations
- **Secure external links** with `rel="noopener noreferrer"`

## 🔍 SEO Rules (100% Target)

### Meta Tags Requirements
```javascript
// ✅ Complete meta tag setup
export const metadata = {
  title: "Specific Page Title - Brand Name",
  description: "Unique 150-160 character description",
  openGraph: {
    title: "Page Title",
    description: "Description",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }]
  }
};
```

### SEO Checklist
- **Unique titles** for each page (50-60 characters)
- **Meta descriptions** (150-160 characters)
- **Structured data** where applicable
- **Proper heading hierarchy** (single h1 per page)
- **Internal linking** structure
- **XML sitemap** generation

## 🧪 Testing Requirements

### Lighthouse CI Integration
```bash
# Required before any deployment
npm run test:lighthouse  # Must pass all thresholds
npm run build            # Production build required
npm start               # Test production server
```

### Automated Checks
- **Run Lighthouse CI** on every PR
- **Performance budget** enforcement
- **Accessibility testing** with axe-core
- **Visual regression testing** for UI changes

## 🚨 Critical Rules - Never Break These

1. **Never deploy** with Lighthouse scores below targets
2. **Always test production builds** before deployment  
3. **Fix accessibility issues immediately** - they affect real users
4. **Monitor Core Web Vitals** in production
5. **Use semantic HTML** - divs are not buttons
6. **Test with keyboard navigation** for all interactive elements
7. **Verify color contrast** for all text/background combinations

## 🔧 Development Workflow

### Before Committing
```bash
npm run lint              # ESLint checks
npm test                 # Unit tests
npm run test:e2e         # E2E tests
npm run build            # Production build test
npm run test:lighthouse  # Lighthouse audit
```

### Performance Monitoring
- **Lighthouse CI** reports on every build
- **Core Web Vitals** tracking in production
- **Bundle analyzer** for JavaScript size monitoring
- **Image optimization** verification

## 📋 Quick Reference

### Emergency Performance Fixes
1. **Images too large?** → Add proper `sizes` attribute
2. **JavaScript bundle big?** → Check for unnecessary imports
3. **Slow loading?** → Enable static generation
4. **Console errors?** → Check external script loading
5. **Poor contrast?** → Use darker colors (emerald-700 vs emerald-600)

### Accessibility Quick Wins
- Add `alt=""` for decorative images
- Use `alt="description"` for meaningful images  
- Ensure 4.5:1 contrast ratio minimum
- Test with keyboard-only navigation
- Use semantic HTML elements

This document ensures Amazon Q maintains the current high Lighthouse standards (99% Performance, 96% Accessibility, 100% Best Practices, 100% SEO) for the HarzStorage project.
