# Release Process

This document describes the release process for HarzStorage, which uses a two-step automated workflow with manual approval.

## Overview

The release process creates a new version, builds artifacts, runs security scans, and creates a GitHub release. Due to branch protection rules, releases require a Pull Request workflow.

## Prerequisites

- Admin access to the repository
- All changes merged to `main` branch
- All CI checks passing on `main`

## Release Steps

### 1. Trigger Release Workflow

1. Go to **GitHub Actions** → **Release** workflow
2. Click **"Run workflow"**
3. Select version bump type:
   - `patch`: Bug fixes (1.0.0 → 1.0.1)
   - `minor`: New features (1.0.0 → 1.1.0)
   - `major`: Breaking changes (1.0.0 → 2.0.0)
4. Click **"Run workflow"**

### 2. Automated Process

The workflow automatically:

- ✅ Runs all tests (unit + E2E)
- ✅ Builds application
- ✅ Bumps version in `package.json` and `helm/Chart.yaml`
- ✅ Generates changelog
- ✅ Creates Docker image
- ✅ Runs security scans (Trivy, npm audit)
- ✅ Generates SBOM and security artifacts
- ✅ Packages Helm chart
- ✅ Creates temporary release branch
- ✅ Creates Pull Request to main
- ✅ Pushes git tag
- ✅ Creates GitHub Release with artifacts

### 3. Manual Completion

1. **Review the Release PR**
   - Check version bump changes
   - Verify changelog updates
   - Ensure all CI checks pass

2. **Merge the Release PR**
   - Go to the created PR (linked in workflow output)
   - Review changes
   - Merge the PR (squash merge recommended)

3. **Verify Release**
   - Check GitHub Releases page
   - Verify all artifacts are attached
   - Confirm Docker image is tagged correctly

## Release Artifacts

Each release includes:

- 📋 **SBOM** (`sbom-{version}.spdx.json`) - Software Bill of Materials
- 🔒 **Container Scan** (`trivy-results-{version}.sarif`) - Security vulnerabilities
- 📊 **Dependency Audit** (`security-audit-{version}.json`) - NPM security report
- 📦 **Helm Chart** (`harz-storage-{version}.tgz`) - Kubernetes deployment
- ✅ **Checksums** (`checksums-{version}.txt`) - File integrity verification

## Docker Image

```bash
# Pull specific version
docker pull harz-storage:{version}

# Pull latest
docker pull harz-storage:latest
```

## Helm Deployment

```bash
# Deploy specific version
helm upgrade --install harz-storage ./harz-storage-{version}.tgz \
  --set image.tag={version}

# Deploy from GitHub release
wget https://github.com/FaulerInformatiker/harz-storage/releases/download/v{version}/harz-storage-{version}.tgz
helm upgrade --install harz-storage ./harz-storage-{version}.tgz
```

## Troubleshooting

### Release Workflow Fails

1. Check workflow logs in GitHub Actions
2. Ensure all tests pass locally: `npm test && npm run test:e2e`
3. Verify Docker builds: `docker build -t test .`
4. Check branch protection settings

### PR Creation Fails

1. Verify GitHub App permissions
2. Check if temporary branch already exists
3. Ensure `APP_ID` and `APP_PRIVATE_KEY` secrets are configured

### Security Scans Fail

1. Review Trivy scan results
2. Update vulnerable dependencies: `npm audit fix`
3. Check Docker base image for vulnerabilities
4. Update security scan configuration if needed

## Branch Protection

The `main` branch is protected and requires:
- ✅ Status checks to pass
- ✅ Up-to-date branches
- ✅ Dismiss stale reviews
- ✅ Require review from code owners

This is why releases use the PR workflow instead of direct pushes.

## Rollback Process

If a release needs to be rolled back:

1. **Revert the release PR merge**
2. **Delete the problematic tag**:
   ```bash
   git tag -d v{version}
   git push origin :refs/tags/v{version}
   ```
3. **Delete the GitHub release**
4. **Deploy previous version**:
   ```bash
   helm upgrade harz-storage ./harz-storage-{previous-version}.tgz
   ```

## Security Considerations

- All releases include comprehensive security scanning
- Container images are scanned for CVEs
- Dependencies are audited for vulnerabilities
- SBOM provides complete software inventory
- Checksums ensure artifact integrity

## Automation Details

The release process is fully automated except for the final PR merge, which ensures:
- Human oversight of version changes
- All quality gates pass before release completion
- Proper audit trail through PR history
- Compliance with branch protection rules
