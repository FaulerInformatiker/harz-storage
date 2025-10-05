#!/bin/bash
set -e

IMAGE_NAME=${1:-harz-storage:latest}
REPORT_DIR="security-reports"

echo "🔒 Starting Docker security scans for $IMAGE_NAME"

# Create reports directory
mkdir -p $REPORT_DIR

# 1. Trivy vulnerability scan
echo "📊 Running Trivy vulnerability scan..."
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  -v $PWD/$REPORT_DIR:/reports \
  aquasec/trivy:latest image \
  --format json \
  --output /reports/trivy-report.json \
  --severity HIGH,CRITICAL \
  $IMAGE_NAME

# 2. Docker Scout (if available)
if command -v docker &> /dev/null && docker scout version &> /dev/null; then
  echo "📊 Running Docker Scout scan..."
  docker scout cves $IMAGE_NAME --format json --output $REPORT_DIR/scout-report.json || true
fi

# 3. Hadolint Dockerfile linting
echo "📊 Running Hadolint Dockerfile scan..."
docker run --rm -i hadolint/hadolint:latest < Dockerfile > $REPORT_DIR/hadolint-report.txt || true

# 4. Dockle security checker
echo "📊 Running Dockle security check..."
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  goodwithtech/dockle:latest \
  --format json \
  --output $REPORT_DIR/dockle-report.json \
  $IMAGE_NAME || true

echo "✅ Security scans completed. Reports saved in $REPORT_DIR/"
echo "📋 Summary:"
echo "  - Trivy: CVE vulnerabilities"
echo "  - Hadolint: Dockerfile best practices"
echo "  - Dockle: Container security"

# Check for critical and high vulnerabilities
if [ -f "$REPORT_DIR/trivy-report.json" ]; then
  CRITICAL_HIGH_COUNT=$(jq '.Results[]?.Vulnerabilities[]? | select(.Severity == "CRITICAL" or .Severity == "HIGH") | length' $REPORT_DIR/trivy-report.json 2>/dev/null | wc -l || echo "0")
  if [ "$CRITICAL_HIGH_COUNT" -gt 0 ]; then
    echo "⚠️  Found $CRITICAL_HIGH_COUNT critical/high severity vulnerabilities"
    exit 1
  fi
fi

echo "✅ No critical or high severity vulnerabilities found"
