# ADR-004: Internationalization Approach

## Status
Accepted

## Context
We need to support multiple languages for the self-storage website:
- German (primary market)
- English (international users)
- Simple translation system
- SEO-friendly URLs
- Easy content management
- Type-safe translations

## Decision
We will implement a **custom React Context-based i18n solution** with JSON translation files.

### Key Components:
- `TranslationContext` - React Context for language state
- `lib/translations/de.json` - German translations
- `lib/translations/en.json` - English translations
- Custom `useTranslation` hook
- localStorage persistence for language preference

## Alternatives Considered
1. **next-i18next** - Complex setup, overkill for 2 languages
2. **react-i18next** - Full-featured but heavy for our needs
3. **next-intl** - Good but adds dependency
4. **Hardcoded strings** - Not maintainable
5. **Server-side i18n** - Complex routing requirements

## Consequences

### Positive:
- Zero additional dependencies
- Simple implementation and maintenance
- Type-safe with TypeScript interfaces
- Easy to add new languages
- Client-side language switching
- Persistent user preferences
- Full control over translation logic
- Easy testing and debugging

### Negative:
- No advanced i18n features (pluralization, date formatting)
- Manual implementation of translation utilities
- No translation management tools integration
- Client-side only (no SEO-optimized URLs)
- Limited formatting capabilities

### Technical Impact:
- Minimal bundle size impact
- Fast language switching (no page reload)
- Easy integration with existing components
- Simple translation file management
- Clear separation between content and code
- Easy to migrate to full i18n solution if needed

### Translation Structure:
```json
{
  "hero": {
    "title": "Self-Storage in Langelsheim",
    "subtitle": "Sichere Lagerräume im Harz"
  },
  "navigation": {
    "home": "Startseite",
    "contact": "Kontakt"
  }
}
```
