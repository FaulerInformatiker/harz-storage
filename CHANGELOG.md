## [0.1.3](https://github.com/FaulerInformatiker/harz-storage/compare/v0.1.2...v0.1.3) (2025-10-05)



## [0.1.2](https://github.com/FaulerInformatiker/harz-storage/compare/v0.1.1...v0.1.2) (2025-10-05)


### Bug Fixes

* disable E2E tests in Husky hooks, keep enabled in CI pipeline ([c403f08](https://github.com/FaulerInformatiker/harz-storage/commit/c403f0892cc33c19ad5bb151184f84f08033c666))
* resolve all E2E test failures and improve test reliability ([#27](https://github.com/FaulerInformatiker/harz-storage/issues/27)) ([ae3b96d](https://github.com/FaulerInformatiker/harz-storage/commit/ae3b96d58ca11ff700c1df7439e7265056b665ca))
* resolve all E2E test failures with proper selectors ([7e14c58](https://github.com/FaulerInformatiker/harz-storage/commit/7e14c5868d4c2130af3e0a80fc016e38fd8f62cc))
* resolve npm audit vulnerabilities in conventional-changelog packages ([a106c22](https://github.com/FaulerInformatiker/harz-storage/commit/a106c22d5fbd6235ff9c6f1ac5878d7ebcc987e0))
* resolve release pipeline issues ([#33](https://github.com/FaulerInformatiker/harz-storage/issues/33)) ([238fa61](https://github.com/FaulerInformatiker/harz-storage/commit/238fa613cf9e5377de06337ba4f20f5da88d9754))
* update E2E tests with more specific selectors ([bc1c350](https://github.com/FaulerInformatiker/harz-storage/commit/bc1c350d2501c74175f69375cf86045d9014689f))


### Features

* add automated changelog generation to release process ([b6b8fba](https://github.com/FaulerInformatiker/harz-storage/commit/b6b8fbac1fc161dd2a50403e0715785b45f1a287))
* add comprehensive Amazon Q project rules and development guidelines ([#30](https://github.com/FaulerInformatiker/harz-storage/issues/30)) ([d561ec9](https://github.com/FaulerInformatiker/harz-storage/commit/d561ec9115034a6f2e3c8683a983d81dc1ff1194)), closes [#26](https://github.com/FaulerInformatiker/harz-storage/issues/26)
* add E2E tests to CI pipeline, temporarily disable in Husky ([ae08547](https://github.com/FaulerInformatiker/harz-storage/commit/ae085474cfc8a4aac92b530be55cdc95cf7c90a6))
* add manual trigger for ZAP scans ([1b7a688](https://github.com/FaulerInformatiker/harz-storage/commit/1b7a68853b60b720e62cada972820a84cbde132c))
* add SBOM generation with CycloneDX ([a6e706b](https://github.com/FaulerInformatiker/harz-storage/commit/a6e706b27462df5fc5b474f7c5f819229610bdb3))
* embed SBOM files into Docker image and add Docker SBOM generation ([c88ad2b](https://github.com/FaulerInformatiker/harz-storage/commit/c88ad2b4c255bb8e094de80b4584645f37a57fc2))
* enable automerge for Renovate PRs ([#31](https://github.com/FaulerInformatiker/harz-storage/issues/31)) ([3f9423e](https://github.com/FaulerInformatiker/harz-storage/commit/3f9423e6d7f29086b7e4f26d22d43bb3522b6565))
* enable E2E tests in Husky and add enforcement rules ([96e9fb5](https://github.com/FaulerInformatiker/harz-storage/commit/96e9fb5cb748817b0824cd8459e5803c8e4d488b))
* Increase test coverage to 90% with comprehensive CI integration ([#24](https://github.com/FaulerInformatiker/harz-storage/issues/24)) ([86fc057](https://github.com/FaulerInformatiker/harz-storage/commit/86fc05743811857e20c4543a9d74e464f5313ad7))
* recover and track cursor rules, remove from gitignore ([51004fc](https://github.com/FaulerInformatiker/harz-storage/commit/51004fc741d0582d4d90f921cf1ee073e90115af))
* update Next.js to latest version 15.5.4 ([#28](https://github.com/FaulerInformatiker/harz-storage/issues/28)) ([3ccbf89](https://github.com/FaulerInformatiker/harz-storage/commit/3ccbf89dddfc93a2ce2a59b5e8603274a8a993f8))



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
