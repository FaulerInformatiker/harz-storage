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

### Impact
- CI pipeline failure
- Broken main branch temporarily
- Time wasted on retroactive fixes
- Reduced confidence in deployment process

### What We Fixed
1. **Enhanced Git Hooks**:
   - Added comprehensive pre-commit hook (format + lint + test)
   - Added pre-push hook with unit and E2E tests
   - Installed Husky properly with prepare script

2. **Process Improvements**:
   - Always run `npm test` before any commit
   - Update tests in same commit as component changes
   - Consider test impact when changing UI text/structure

### Prevention Strategy
- **Pre-commit**: Format, lint, and run unit tests
- **Pre-push**: Run full test suite including E2E
- **Developer workflow**: Test → Fix → Commit (atomic)
- **Code review**: Verify test updates accompany UI changes

### Key Takeaway
**UI changes and test updates must be atomic operations.** Never push component changes without verifying and updating corresponding tests.
