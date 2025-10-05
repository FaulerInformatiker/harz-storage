# Git Workflow Documentation

## ⚠️ Important Note

**SINGLE DEVELOPER PROJECT**: This project does not require code reviews or approving reviewers. The workflow is designed for a single developer with CI/CD automation ensuring code quality.

**NEVER ADD REVIEWER REQUIREMENTS** - This is a solo project where the developer can merge their own PRs after CI passes.

## Branch Protection Rules

The `main` branch is protected with the following rules:

### Required Status Checks
- **test (22)**: Unit and E2E tests must pass
- **type-check**: TypeScript compilation must succeed
- **lint**: ESLint checks must pass
- **build**: Application build must succeed
- **security**: Security audit must pass

### Pull Request Requirements
- **No reviewer required** - Single developer project
- **Up-to-date branches** required (strict status checks)
- **All CI checks must pass** before merge

### Admin Enforcement
- **Admins must follow rules** - No bypassing protection rules

## Git Workflow

### 1. Feature Development

```bash
# Create feature branch from main
git checkout main
git pull origin main
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: your feature description"

# Push feature branch
git push -u origin feature/your-feature-name
```

### 2. Pull Request Process

```bash
# Create PR using GitHub CLI
gh pr create --title "feat: Your Feature Title" --body "Description of changes"

# Or create PR via GitHub web interface
# https://github.com/FaulerInformatiker/harz-storage/compare
```

### 3. PR Requirements

Before merge, ensure:
- ✅ All CI checks pass (test, type-check, lint, build, security)
- ✅ Branch is up-to-date with main
- ✅ No merge conflicts

### 4. Merge Process

```bash
# After PR approval, merge via GitHub interface
# Or using GitHub CLI:
gh pr merge --squash  # Recommended for clean history
```

## Branch Types

### Main Branch (`main`)
- **Protected**: Cannot push directly
- **Stable**: Always deployable
- **Source of truth**: All features merge here

### Feature Branches (`feature/`)
```bash
feature/add-contact-form
feature/improve-performance
feature/update-dependencies
```

### Documentation Branches (`docs/`)
```bash
docs/api-documentation
docs/deployment-guide
docs/git-workflow
```

### Hotfix Branches (`hotfix/`)
```bash
hotfix/security-vulnerability
hotfix/critical-bug-fix
```

### Release Branches (`release/`)
```bash
release/v1.2.0
release/v2.0.0-beta
```

## Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format
<type>[optional scope]: <description>

# Examples
feat: add contact form validation
fix: resolve mobile navigation issue
docs: update API documentation
style: format code with prettier
refactor: simplify authentication logic
test: add unit tests for validation
chore: update dependencies
```

### Commit Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code formatting (no logic changes)
- **refactor**: Code restructuring (no feature changes)
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

## Pre-commit Hooks

Automated checks run before each commit:

```bash
# Unit tests
npm test

# E2E tests  
npm run test:e2e

# Linting
npm run lint

# Type checking
npx tsc --noEmit
```

## CI/CD Pipeline

### On Pull Request
1. **Lint Check**: Code style and quality
2. **Type Check**: TypeScript compilation
3. **Unit Tests**: Jest test suite with coverage
4. **E2E Tests**: Playwright browser tests
5. **Build Test**: Next.js production build
6. **Security Scan**: npm audit and ZAP baseline

### On Main Branch
1. All PR checks plus:
2. **Release Pipeline**: Automated versioning and deployment
3. **Security Scanning**: Enhanced security checks
4. **SBOM Generation**: Software Bill of Materials

## Release Process

### Manual Release (Recommended)
```bash
# Trigger via GitHub Actions
# Go to Actions → Release → Run workflow
# Choose version type: patch/minor/major
```

### Local Release (Development)
```bash
npm run release:patch   # 1.0.0 → 1.0.1
npm run release:minor   # 1.0.0 → 1.1.0  
npm run release:major   # 1.0.0 → 2.0.0
```

## Troubleshooting

### Failed CI Checks
```bash
# Run checks locally before pushing
npm run lint          # Fix linting issues
npm test              # Fix failing tests
npm run test:e2e      # Fix E2E test failures
npm run build         # Fix build errors
npm audit             # Fix security vulnerabilities
```

### Merge Conflicts
```bash
# Update feature branch with latest main
git checkout feature/your-branch
git fetch origin
git rebase origin/main

# Resolve conflicts and continue
git add .
git rebase --continue
git push --force-with-lease
```

### Branch Protection Bypass (Admins Only)
```bash
# Temporarily disable protection (emergency only)
gh api repos/FaulerInformatiker/harz-storage/branches/main/protection \
  --method DELETE

# Re-enable protection after emergency fix
# Use the setup script in this documentation
```

## Best Practices

### Code Quality
- ✅ Write meaningful commit messages
- ✅ Keep commits atomic and focused
- ✅ Add tests for new features
- ✅ Update documentation for changes
- ✅ Review your own PR before requesting review

### Branch Management
- ✅ Delete feature branches after merge
- ✅ Keep feature branches small and focused
- ✅ Rebase feature branches to keep history clean
- ✅ Use descriptive branch names

### Security
- ✅ Never commit secrets or API keys
- ✅ Run security scans before merging
- ✅ Keep dependencies updated
- ✅ Follow security best practices

## Quick Reference

### Common Commands
```bash
# Check branch protection status
gh api repos/FaulerInformatiker/harz-storage/branches/main/protection

# List all branches
git branch -a

# Check CI status
gh pr checks

# View PR details
gh pr view

# Merge PR
gh pr merge --squash

# Delete merged branch
git branch -d feature/branch-name
git push origin --delete feature/branch-name
```

### Useful Aliases
```bash
# Add to ~/.gitconfig
[alias]
    co = checkout
    br = branch
    ci = commit
    st = status
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = !gitk
```

## Support

For questions about the git workflow:
1. Check this documentation
2. Review existing PRs for examples
3. Ask in team discussions
4. Consult [GitHub Docs](https://docs.github.com/en/pull-requests)
