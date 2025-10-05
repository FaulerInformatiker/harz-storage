# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- SBOM generation with CycloneDX format for npm dependencies and Docker images
- Embedded SBOM files in Docker images at `/app/sbom/`
- Automated changelog generation in release process
- ZAP security scanning with baseline and full scan workflows
- Comprehensive CI/CD pipeline with Node.js 22 support

### Fixed
- Release pipeline permissions for GitHub Actions
- ZAP scan artifact naming conflicts
- Node.js version consistency across all workflows

### Security
- Enhanced security scanning with multiple tools (Trivy, Hadolint, ZAP)
- Container hardening with non-root user
- Automated vulnerability detection and reporting
