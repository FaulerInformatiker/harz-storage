# Contract Testing Rules - Critical Guidelines

## ⚠️ WARNING: Contract Tests Represent External API Agreements

Contract tests in this project define the expected behavior of external APIs that our application depends on. **Modifying these tests can break production systems.**

## What Are Contract Tests?

Contract tests verify that:
1. Our application sends requests in the expected format
2. External APIs respond with the expected data structure
3. Both sides of the API contract are maintained

## Current Contracts

### Contacts API Contract (`/api/contacts`)
- **Provider**: External contact management service
- **Consumer**: HarzStorage frontend
- **Contract File**: `tests/contract/contacts-api.contract.test.js`
- **Expectations**: POST requests with ContactFormData interface

### Boxes API Contract (`/api/boxes`)
- **Provider**: External inventory service  
- **Consumer**: HarzStorage frontend
- **Contract File**: `tests/contract/boxes-api.contract.test.js`
- **Expectations**: GET requests returning BoxData array

## Rules for Contract Test Modifications

### ❌ NEVER Do This Without Approval:
- Change expected request/response schemas
- Modify API endpoint URLs
- Alter HTTP methods or status codes
- Remove existing contract expectations
- Change data types in interfaces

### ✅ Safe Modifications:
- Add new optional fields to requests
- Add additional test scenarios for existing contracts
- Update test descriptions and comments
- Fix test setup/teardown code

## Before Modifying Contract Tests

1. **Understand the Impact**: Contract changes affect external systems
2. **Get Approval**: Coordinate with API providers before changes
3. **Version Compatibility**: Ensure backward compatibility
4. **Documentation**: Update API documentation
5. **Rollback Plan**: Have a plan to revert changes if needed

## Contract Test Workflow

### Automated Execution
Contract tests run automatically via Git hooks:
- **Pre-commit**: Validates contracts before each commit
- **Pre-push**: Ensures contracts pass before pushing to remote
- **CI/CD Pipeline**: Runs on all pull requests and deployments

This ensures contract validation at every stage of development.

### Adding New Contracts
1. Coordinate with API provider to define contract
2. Create contract test file in `tests/contract/`
3. Implement both consumer and provider expectations
4. Publish contract to Pact Broker (if configured)
5. Verify with API provider before merging

### Modifying Existing Contracts
1. **STOP**: Get explicit approval from API provider
2. Create backward-compatible changes only
3. Test against real API endpoints
4. Update documentation
5. Coordinate deployment with API provider

## Contract Publishing

```bash
# Publish contracts to Pact Broker
npm run test:contract:publish
```

**Note**: Publishing requires `PACT_BROKER_BASE_URL` environment variable.

## Emergency Procedures

### If Contract Tests Fail in CI/CD:
1. **Do NOT bypass** - contract failures indicate breaking changes
2. Check if external API has changed unexpectedly
3. Contact API provider immediately
4. Implement temporary fallback if necessary
5. Update contracts only after provider confirmation

### If Production API Changes:
1. External API provider should notify before changes
2. Update contracts in coordination with provider
3. Test thoroughly in staging environment
4. Deploy contract updates before API changes go live

## Monitoring Contract Health

- Contract tests run on every CI/CD pipeline
- Failed contracts block deployments
- Monitor external API status and changes
- Set up alerts for contract test failures

## Contact Information

For contract-related issues:
- **API Provider Contacts**: [To be filled with actual contacts]
- **Internal Team**: Development team lead
- **Emergency**: Use project issue tracker with "contract-critical" label

## Remember

Contract tests are not just tests - they are **agreements between systems**. Treat them with the same care as production database schemas or API specifications.
