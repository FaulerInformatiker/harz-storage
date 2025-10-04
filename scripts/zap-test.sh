#!/bin/bash

# ZAP Security Testing Script
set -e

echo "🔒 Starting OWASP ZAP Security Testing..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Start the application
echo "🚀 Starting Next.js application..."
npm run build
npm start &
APP_PID=$!

# Wait for application to be ready
echo "⏳ Waiting for application to start..."
sleep 15

# Check if application is responding
if ! curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "❌ Application is not responding on port 3000"
    kill $APP_PID 2>/dev/null || true
    exit 1
fi

echo "✅ Application is ready"

# Create reports directory
mkdir -p zap-reports

# Run ZAP Baseline Scan
echo "🔍 Running ZAP Baseline Scan..."
docker run --rm \
    -v $(pwd)/zap-reports:/zap/wrk/:rw \
    -v $(pwd)/.zap:/zap/rules/:ro \
    ghcr.io/zaproxy/zaproxy:stable \
    zap-baseline.py \
    -t http://host.docker.internal:3000 \
    -r baseline-report.html \
    -x baseline-report.xml \
    -J baseline-report.json \
    -c /zap/rules/rules.tsv \
    -w baseline-report.md \
    || true

# Run ZAP API Scan if mock server is available
if curl -f http://localhost:3001 > /dev/null 2>&1; then
    echo "🔍 Running ZAP API Scan..."
    docker run --rm \
        -v $(pwd)/zap-reports:/zap/wrk/:rw \
        ghcr.io/zaproxy/zaproxy:stable \
        zap-api-scan.py \
        -t http://host.docker.internal:3001 \
        -r api-report.html \
        -x api-report.xml \
        -J api-report.json \
        || true
fi

# Stop the application
echo "🛑 Stopping application..."
kill $APP_PID 2>/dev/null || true

echo "📊 ZAP Security Testing Complete!"
echo "📁 Reports saved in: zap-reports/"
echo "🌐 View HTML report: zap-reports/baseline-report.html"

# Check if any high/medium issues found
if [ -f "zap-reports/baseline-report.json" ]; then
    HIGH_ISSUES=$(jq '.site[0].alerts[] | select(.riskdesc | contains("High"))' zap-reports/baseline-report.json 2>/dev/null | wc -l || echo "0")
    MEDIUM_ISSUES=$(jq '.site[0].alerts[] | select(.riskdesc | contains("Medium"))' zap-reports/baseline-report.json 2>/dev/null | wc -l || echo "0")
    
    echo "🔍 Security Issues Found:"
    echo "   High: $HIGH_ISSUES"
    echo "   Medium: $MEDIUM_ISSUES"
    
    if [ "$HIGH_ISSUES" -gt 0 ]; then
        echo "❌ High severity security issues found!"
        exit 1
    fi
fi

echo "✅ Security scan completed successfully!"
