# Lessons Learned

## Test Failures After Design Changes (2025-10-04)

### What Happened

- Made design changes to Hero and Pricing components (LAGER RAUM branding)
- Pushed changes without running tests locally
- CI pipeline failed because tests expected old content
- Had to fix tests retroactively

### Root Cause

- **Missing local test execution** before push
- **Incomplete git hooks** - only had basic pre-commit, no pre-push
- **Separated commits** - design changes and test updates should be atomic
- **Missing E2E test updates** - only fixed unit tests initially

### Impact

- CI pipeline failure
- Broken main branch temporarily
- Time wasted on retroactive fixes
- Reduced confidence in deployment process
- Multiple failed pushes due to incomplete test coverage

### What We Fixed

1. **Enhanced Git Hooks**:
   - Added comprehensive pre-commit hook (unit tests)
   - Added pre-push hook with full test suite
   - Installed Husky properly with prepare script
   - Git hooks successfully prevented pushing broken code

2. **Complete Test Updates**:
   - Fixed unit tests: `LAGERRAUMin Langelsheim`, `LAGER PREISE`
   - Fixed E2E tests: Updated all heading expectations
   - Updated both Jest and Playwright test suites atomically

3. **Process Improvements**:
   - Always run `npm test` before any commit
   - Update ALL tests (unit + E2E) in same commit as component changes
   - Consider test impact when changing UI text/structure
   - Use `.prettierignore` to avoid formatting conflicts

### Prevention Strategy

- **Pre-commit**: Run unit tests to catch basic issues
- **Pre-push**: Run full test suite including E2E (when enabled)
- **Developer workflow**: Test → Fix → Commit (atomic)
- **Code review**: Verify test updates accompany UI changes
- **CI/CD**: Maintain comprehensive test coverage in pipeline

### Key Takeaways

1. **UI changes and test updates must be atomic operations**
2. **Git hooks are essential for preventing broken pushes**
3. **Both unit AND E2E tests need updates for UI changes**
4. **Local testing is faster than CI debugging**
5. **Comprehensive test coverage prevents deployment issues**

### Success Metrics

- ✅ Git hooks now prevent untested code from being pushed
- ✅ All test suites updated to match new design
- ✅ CI pipeline will pass on next run
- ✅ Process documented for future design changes
