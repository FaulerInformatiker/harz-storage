# HarzStorage - Self-Storage Website

[![Main Branch CI](https://github.com/FaulerInformatiker/harz-storage/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/FaulerInformatiker/harz-storage/actions/workflows/ci.yml)
[![Release Pipeline](https://github.com/FaulerInformatiker/harz-storage/actions/workflows/release.yml/badge.svg)](https://github.com/FaulerInformatiker/harz-storage/actions/workflows/release.yml)
[![Code Coverage](https://img.shields.io/badge/coverage-90%25-brightgreen)](https://github.com/FaulerInformatiker/harz-storage)

Eine moderne, responsive Website für HarzStorage, einen Self-Storage-Anbieter in Langelsheim im Harz.

## 🚀 Features

- **Responsive Design** - Optimiert für Desktop, Tablet und Mobile
- **Internationalization (i18n)** - Deutsch/Englisch mit React Context
- **API Integration** - Kontaktformular mit REST API
- **Mock Server** - JSON Server für lokale Entwicklung
- **Modern UI** - Sauberes Design mit Tailwind CSS
- **SEO-optimiert** - Proper Meta-Tags und semantisches HTML
- **Performance** - Optimiert mit Next.js App Router
- **Accessibility** - WCAG-konforme Implementierung
- **Comprehensive Testing** - Jest Unit Tests + Playwright E2E Tests

## 🏗️ Technologie-Stack

- **Framework**: Next.js 14.2.15 mit App Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **TypeScript**: Vollständige Typisierung
- **i18n**: React Context für Sprachverwaltung
- **API**: REST API mit TypeScript Interfaces
- **Testing**: Jest + React Testing Library + Playwright
- **Mock Server**: JSON Server für lokale Entwicklung
- **CI/CD**: GitHub Actions Ready

## 📋 Inhalte

### 1. Hero-Bereich

- Prägnante Überschrift "Self-Storage in Langelsheim"
- Kurzbeschreibung der Services
- Call-to-Action Buttons
- Sprachumschaltung (DE/EN)

### 2. Vorteile-Sektion

- 24/7 Zugang per Code
- Videoüberwacht und alarmgesichert
- Transparente Preise
- Flexible Laufzeiten

### 3. Größen & Preise

- 5m² - 25€/Monat (Umzugskartons)
- 10m² - 45€/Monat (1-Zimmer-Wohnung)
- 20m² - 80€/Monat (2-3 Zimmer-Wohnung)

### 4. So funktioniert's

- Schritt 1: Box auswählen und anfragen
- Schritt 2: Vertrag unterschreiben
- Schritt 3: Einlagern mit 24/7 Zugang

### 5. Sicherheit

- Videoüberwachung
- Elektronische Zugangskontrolle
- Versicherungsmöglichkeiten

### 6. Kontakt & Anfrageformular

- Vollständiges Kontaktformular mit API Integration
- Kontaktinformationen
- Öffnungszeiten
- Formularvalidierung und Fehlerbehandlung

### 7. Footer

- Adresse und Kontaktdaten
- Öffnungszeiten
- Links zu Impressum/Datenschutz

## 🛠️ Entwicklung

### Lokale Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Mit Mock API Server (empfohlen)
npm run dev:full

# Mock API Server separat starten
npm run mock-api
```

### API Entwicklung

```bash
# Mock Server läuft auf http://localhost:3001
# Endpoints:
# GET/POST http://localhost:3001/contacts
# GET/POST http://localhost:3001/submissions

# API Service in lib/api.ts
# Interface: ContactFormData
# Function: submitContactForm()
```

### Produktions-Build

```bash
# Build erstellen
npm run build

# Produktionsserver starten
npm run start
```

## 🧪 Testing

### Unit Tests (Jest + React Testing Library)

```bash
# Tests ausführen
npm test

# Tests mit Watch-Modus
npm run test:watch

# Coverage Report
npm run test:coverage
```

**Test Coverage**: 90% Minimum für branches, functions, lines, statements

### E2E Tests (Playwright)

```bash
# E2E Tests ausführen
npm run test:e2e

# E2E Tests mit UI
npm run test:e2e:ui

# Playwright Report anzeigen
npx playwright show-report
```

**E2E Test Suites**:

- Homepage functionality
- Language switching (DE/EN)
- Contact form API integration
- Mobile responsiveness
- Form validation and error handling

### Test Struktur

```
app/__tests__/          # Jest Unit Tests
tests/e2e/             # Playwright E2E Tests
mock-api/              # JSON Server Mock Data
```

## 🌐 Internationalization

### Sprachunterstützung

- **Deutsch** (Standard)
- **Englisch**
- React Context für State Management
- Persistierung im localStorage
- Vollständige Übersetzung aller UI-Elemente

### Translation Files

```
lib/translations/de.json    # Deutsche Übersetzungen
lib/translations/en.json    # Englische Übersetzungen
lib/TranslationContext.tsx  # React Context Provider
```

### Usage

```tsx
import { useTranslation } from "../lib/TranslationContext";

const { t, language, setLanguage } = useTranslation();
const text = t("hero.title");
```

## 🔧 API Integration

### Contact Form API

```typescript
// Interface
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  size: string;
  message: string;
}

// Usage
import { submitContactForm } from "../lib/api";
const result = await submitContactForm(formData);
```

### Environment Configuration

- **Development**: Mock Server (localhost:3001)
- **Production**: Real API (/api endpoints)
- Automatische Umschaltung basierend auf NODE_ENV

## 🎨 Design-System

### Farben

- **Primary**: Blautöne (#3b82f6, #2563eb, #1d4ed8)
- **Accent**: Grüntöne (#22c55e, #16a34a)
- **Neutral**: Graustufen für Text und Hintergründe

### Komponenten

- Wiederverwendbare Button-Styles
- Konsistente Spacing-Patterns
- Responsive Grid-Layouts
- Hover- und Focus-States
- Loading States für API Calls

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Dependency Management

### Automated Updates

- **Renovate Bot**: Automated dependency updates every Monday morning
- **Security Alerts**: Immediate notifications for vulnerability fixes
- **Grouped Updates**: Related packages updated together for compatibility
- **Manual Review**: All updates require manual approval before merging

### Update Schedule

- **Regular Updates**: Weekly on Monday before 6 AM (Europe/Berlin)
- **Security Updates**: Immediate via vulnerability alerts
- **Lock File Maintenance**: Weekly cleanup of package-lock.json

## 🚀 Release Management

### Manual Releases Only

- **Manual Trigger**: Use GitHub Actions workflow dispatch for all releases
- **Version Types**: Choose patch, minor, or major version bumps
- **Version Bumping**: Automatically updates package.json and Helm chart
- **GitHub Releases**: Creates release with changelog and deployment instructions

### Release Commands

```bash
# Local version bumping (for testing)
npm run release:patch   # 1.0.0 -> 1.0.1
npm run release:minor   # 1.0.0 -> 1.1.0
npm run release:major   # 1.0.0 -> 2.0.0
```

### Manual Release Trigger

1. Go to GitHub Actions tab
2. Select "Release" workflow
3. Click "Run workflow"
4. Choose version type (patch/minor/major)

## 🚀 Deployment

### Kubernetes (Helm)

```bash
# Build Docker image
docker build -t harz-storage:latest .

# Deploy with Helm
helm install harz-storage ./helm

# Upgrade deployment
helm upgrade harz-storage ./helm

# Custom values
helm install harz-storage ./helm -f custom-values.yaml
```

### Helm Configuration

```yaml
# custom-values.yaml
image:
  repository: your-registry/harz-storage
  tag: v1.0.0

ingress:
  enabled: true
  host: harz-storage.example.com
  tls: true

env:
  API_URL: "https://api.example.com"

autoscaling:
  enabled: true
  minReplicas: 3
  maxReplicas: 20
```

## 📊 Performance & SEO

- **Next.js App Router** für optimale Performance
- **Static Generation** wo möglich
- **Image Optimization** mit next/image
- **Meta Tags** für SEO
- **Semantic HTML** für Accessibility
- **Core Web Vitals** optimiert

## 🔒 Sicherheit

### Container Security Scanning

```bash
# Complete security scan (npm + Docker)
npm run security:complete

# Docker container security scan only
npm run security:docker

# Individual scans
npm run audit                    # NPM vulnerability audit
npm run lint:security           # ESLint security rules
npm run security:zap            # OWASP ZAP penetration test
```

### Security Tools

- **Trivy**: CVE vulnerability scanning
- **Hadolint**: Dockerfile best practices
- **Dockle**: Container security checker
- **Docker Scout**: Supply chain security (if available)
- **OWASP ZAP**: Web application penetration testing
- **ESLint Security**: Static code analysis
- **npm audit**: Dependency vulnerability checking

### Security Features

- **Input Validation** auf Client und Server
- **CSRF Protection** für API Calls
- **XSS Prevention** durch React
- **Type Safety** mit TypeScript
- **Error Boundaries** für robuste UX
- **Container Hardening** mit non-root user
- **Security Headers** in next.config.js
- **Automated CVE Scanning** in CI/CD

## 📄 Lizenz

Dieses Projekt wurde für HarzStorage entwickelt. Alle Rechte vorbehalten.
