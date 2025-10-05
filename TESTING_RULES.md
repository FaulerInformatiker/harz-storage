# Testing Rules - HarzStorage Project

## E2E Testing Requirements

### 🚨 CRITICAL RULE: E2E Tests Must Always Be Enabled

**E2E tests MUST NEVER be disabled in Husky hooks (.husky/pre-commit, .husky/pre-push)**

### Enforcement Mechanisms

1. **Husky Hook Validation**: Both pre-commit and pre-push hooks must include:
   ```bash
   echo "🎭 Running E2E tests..."
   npm run test:e2e
   ```

2. **Code Review Requirements**: 
   - Any PR that modifies Husky hooks must be reviewed for E2E test presence
   - Disabling E2E tests requires explicit approval from project maintainers

3. **CI/CD Validation**: 
   - E2E tests run in CI pipeline on every push/PR
   - Failing E2E tests block merges to main branch

### Rationale

- **Quality Assurance**: E2E tests validate complete user workflows
- **Regression Prevention**: Catch UI/UX issues before deployment  
- **Integration Testing**: Verify API, form submissions, and language switching
- **Mobile Responsiveness**: Ensure proper behavior across device sizes
- **Security Validation**: Test form validation and XSS prevention

### Exceptions

**NO EXCEPTIONS**: E2E tests must always run. If tests are failing:
1. Fix the failing tests immediately
2. Do not disable tests as a workaround
3. Seek help from team members if needed

### Monitoring

- All commits are checked for E2E test execution
- CI pipeline reports include E2E test results
- Failed E2E tests trigger immediate notifications

---

**Remember**: E2E tests are our safety net for user experience quality. Never compromise on this standard.
