# Amazon Q Project Rules - HarzStorage

## Project Overview
HarzStorage is a modern Next.js self-storage website with comprehensive testing, security, and deployment automation. Follow these rules for consistent development practices.

## Code Quality & Standards

### TypeScript Requirements
- All new code MUST use TypeScript with strict mode enabled
- Provide explicit type annotations for function parameters and return types
- Use interfaces over type aliases for object shapes
- Never use `any` type - use `unknown` or proper typing instead

### React Best Practices
- Use functional components with hooks exclusively
- Implement proper error boundaries for production resilience
- Wrap async state updates in React.act() for testing
- Use React.memo() for performance optimization when appropriate
- Follow the established component structure in `/components`

### Code Style
- Use ESLint and Prettier configurations without modifications
- Follow established naming conventions: camelCase for variables, PascalCase for components
- Keep functions small and focused (max 20 lines)
- Use descriptive variable names that explain intent

## Testing Requirements

### Unit Testing (Jest + React Testing Library)
- MANDATORY: Write unit tests for all new components and functions
- Maintain minimum 90% code coverage for branches, functions, lines, statements
- Mock external dependencies and API calls
- Test both happy path and error scenarios
- Use descriptive test names that explain the expected behavior

### E2E Testing (Playwright)
- Add E2E tests for new user-facing features
- Test critical user journeys (contact form, language switching, navigation)
- Use data-testid attributes for reliable element selection
- Test responsive behavior on mobile and desktop
- Verify accessibility compliance

### Contract Testing (Pact)
- ⚠️ CRITICAL: Never modify contract tests without understanding external API impact
- Contract tests represent agreements with external services
- Changes require coordination with API providers
- See `docs/CONTRACT_TESTING_RULES.md` for detailed guidelines

## Security Requirements

### Input Validation
- Validate all user inputs on both client and server side
- Sanitize data before database operations
- Use TypeScript interfaces to enforce data structure
- Implement proper error handling without exposing sensitive information

### Dependencies
- Run `npm audit` before committing changes
- Fix high and critical vulnerabilities immediately
- Use `npm audit fix --force` only after understanding breaking changes
- Keep dependencies updated through automated Renovate PRs

### API Security
- Implement CSRF protection for all form submissions
- Use proper HTTP headers for security (CSP, HSTS, etc.)
- Validate request origins in API endpoints
- Never expose sensitive data in error messages

## Documentation Standards

### Code Documentation
- Add JSDoc comments for all public functions and components
- Document complex business logic with inline comments
- Update README.md when adding new features or changing setup
- Maintain API documentation for all endpoints

### Git Practices
- Use conventional commit messages: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`
- Create descriptive PR titles and descriptions
- Reference issue numbers in commits when applicable
- Keep commits atomic and focused on single changes

## Development Workflow

### Branch Management
- Create feature branches from `main`: `feature/your-feature-name`
- Use protected main branch with required status checks
- All changes must go through PR review process
- Merge only after all CI checks pass

### CI/CD Pipeline
- All tests must pass before merging (unit, E2E, contract, security)
- Build must complete successfully
- Linting must pass with zero errors
- Security scans must show no high/critical vulnerabilities

### Local Development
- Use `npm run dev:full` for development with mock API
- Run tests locally before pushing: `npm test && npm run test:e2e`
- Use pre-commit hooks for automated quality checks
- Test in multiple browsers and screen sizes

## Architecture Guidelines

### File Organization
```
app/                 # Next.js app router pages
components/          # Reusable React components
lib/                # Utility functions and configurations
tests/              # Test files (unit, E2E, contract)
mock-api/           # JSON server mock data
docs/               # Project documentation
```

### API Design
- Use RESTful conventions for API endpoints
- Implement proper HTTP status codes
- Use TypeScript interfaces for request/response types
- Handle errors gracefully with user-friendly messages

### Performance
- Optimize images with Next.js Image component
- Use dynamic imports for code splitting
- Implement proper caching strategies
- Monitor Core Web Vitals metrics

## Internationalization (i18n)

### Translation Management
- Add new text to both `lib/translations/de.json` and `lib/translations/en.json`
- Use translation keys that describe context: `hero.title`, `contact.form.email`
- Test language switching functionality
- Ensure UI layout works with different text lengths

## Deployment & Infrastructure

### Container Security
- Use non-root user in Docker containers
- Scan containers with Trivy for vulnerabilities
- Follow Dockerfile best practices (multi-stage builds, minimal base images)
- Keep base images updated

### Kubernetes Deployment
- Use Helm charts for consistent deployments
- Implement proper resource limits and requests
- Configure health checks and readiness probes
- Use secrets management for sensitive data

## Error Handling

### User Experience
- Provide clear, actionable error messages
- Implement loading states for async operations
- Use error boundaries to prevent app crashes
- Log errors for debugging without exposing sensitive data

### Development
- Use proper error types instead of generic Error
- Implement retry logic for transient failures
- Provide fallback UI for critical failures
- Test error scenarios thoroughly

## Performance Monitoring

### Metrics to Track
- Page load times and Core Web Vitals
- API response times
- Error rates and types
- User interaction patterns

### Optimization
- Use React.memo for expensive components
- Implement proper image optimization
- Minimize bundle size with tree shaking
- Use CDN for static assets

## Accessibility (a11y)

### Requirements
- Maintain WCAG 2.1 AA compliance
- Use semantic HTML elements
- Provide proper ARIA labels and roles
- Test with screen readers
- Ensure keyboard navigation works
- Maintain proper color contrast ratios

## Best Practices Not in Official Docs

### Code Organization
- Group related functionality in custom hooks
- Use composition over inheritance
- Implement proper separation of concerns
- Keep business logic separate from UI components

### State Management
- Use React Context for global state sparingly
- Prefer local state when possible
- Implement proper state normalization for complex data
- Use reducers for complex state logic

### API Integration
- Implement proper retry mechanisms
- Use optimistic updates for better UX
- Cache API responses appropriately
- Handle offline scenarios gracefully

### API Route Testing (MANDATORY)
- **ALL Next.js API routes MUST have corresponding tests**
- API route tests MUST be placed in `app/api/[route]/__tests__/` directory
- MUST test both success and error scenarios
- MUST validate request/response schemas
- MUST test authentication/authorization if applicable
- Coverage requirement: 90% minimum for all API routes
- **NO API route should have 0% test coverage**

### Development Environment
- Use consistent Node.js version across team (specified in .nvmrc)
- Set up proper IDE configurations for consistent formatting
- Use environment variables for configuration
- Implement proper logging levels for different environments

## Enforcement

These rules are enforced through:
- ESLint configuration with custom rules
- Pre-commit hooks running tests and linting
- CI/CD pipeline checks
- Code review requirements
- Automated dependency updates
- Security scanning in CI/CD

Violations of these rules should be addressed immediately and may block PR merges.
