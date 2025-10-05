# Contract Testing Rules & Guidelines

## Core Principles

### 1. **Contract Immutability**
- **Contract tests represent external API expectations and MUST NOT be changed for application fixes**
- If a contract test fails, the application code must be fixed to match the contract
- Contract changes require explicit API versioning and coordination with backend team

### 2. **Consumer-Driven Contracts**
- Frontend (consumer) defines what it expects from the API
- Backend (provider) must fulfill these expectations
- Contract tests validate the consumer's assumptions about the API

## Rules for Contract Test Modifications

### ✅ **ALLOWED Changes**
- **New contract tests** for new API endpoints or features
- **Additional test scenarios** for existing endpoints (edge cases, error conditions)
- **Test infrastructure improvements** (better mocking, setup, teardown)
- **Documentation updates** and comments

### ❌ **FORBIDDEN Changes**
- **Modifying existing contract expectations** to fix failing application code
- **Removing contract tests** because they're "inconvenient"
- **Changing API request/response formats** in contracts without API versioning
- **Weakening validation rules** to make tests pass

## When Contract Tests Fail

### 1. **Application Bug** (Most Common)
```
Contract Test Fails → Fix Application Code → Tests Pass
```
- The application is not correctly implementing the expected API contract
- Update the application logic to match the contract expectations

### 2. **Legitimate API Change** (Requires Coordination)
```
API Change Needed → Update Contract → Coordinate with Backend → Deploy Together
```
- Requires explicit approval from backend team
- Must follow API versioning strategy
- Document breaking changes

### 3. **Contract Bug** (Rare)
```
Contract is Wrong → Review with Backend Team → Update Contract → Update Application
```
- Only when the contract itself has incorrect expectations
- Requires backend team confirmation

## Implementation Guidelines

### Contract Test Structure
```typescript
// ✅ GOOD: Clear, specific expectations
await mockProvider.addInteraction({
  state: 'contact can be created',
  uponReceiving: 'a valid contact submission',
  withRequest: {
    method: 'POST',
    path: '/api/contacts',
    headers: { 'Content-Type': 'application/json' },
    body: { name: 'John Doe', email: 'john@example.com' }
  },
  willRespondWith: {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
    body: { id: '12345', status: 'created' }
  }
});
```

### Error Handling Contracts
```typescript
// ✅ GOOD: Define expected error responses
await mockProvider.addInteraction({
  state: 'validation fails',
  uponReceiving: 'invalid contact data',
  withRequest: { /* invalid data */ },
  willRespondWith: {
    status: 400,
    body: { error: 'Validation failed', details: [...] }
  }
});
```

## Review Process

### Contract Test Changes Require:
1. **Backend team review** for any contract modifications
2. **API documentation updates** for new contracts
3. **Version compatibility check** for breaking changes
4. **Deployment coordination** for contract updates

### Code Review Checklist:
- [ ] Are contract changes justified by new features?
- [ ] Do changes maintain backward compatibility?
- [ ] Is backend team aware of contract changes?
- [ ] Are error scenarios properly covered?
- [ ] Is documentation updated?

## Monitoring & Maintenance

### Regular Tasks:
- **Weekly contract review** with backend team
- **Pact file publishing** to shared broker
- **Contract drift detection** between environments
- **API compatibility monitoring**

### Warning Signs:
- Frequent contract test modifications
- Tests being disabled or skipped
- Mismatched expectations between teams
- Inconsistent API behavior across environments

## Emergency Procedures

### If Contract Tests Block Critical Fixes:
1. **Temporary skip** with explicit TODO and timeline
2. **Immediate backend team notification**
3. **Follow-up contract alignment** within 24 hours
4. **Post-incident review** to prevent recurrence

### Example:
```typescript
// ❌ NEVER DO THIS without proper process
test.skip('should create contact', () => {
  // Skipped because application doesn't match contract
  // TODO: Fix application or update contract by 2025-10-06
});
```

## Success Metrics

- **Contract stability**: < 5% contract changes per sprint
- **API compatibility**: 100% contract test pass rate
- **Team alignment**: Zero surprise API changes
- **Documentation**: All contracts documented and reviewed
