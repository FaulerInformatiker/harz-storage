FROM node:22.20-alpine AS deps
WORKDIR /app
# Update npm to latest version to fix cross-spawn vulnerability
COPY package*.json ./
RUN npm install -g npm@latest && npm ci

FROM node:22.20-alpine AS builder
WORKDIR /app
# Update npm to latest version to fix cross-spawn vulnerability
RUN npm install -g npm@latest
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Generate SBOM with workaround for @napi-rs/wasm-runtime npm ls issue
RUN npm ls --json --long --all > npm-ls-output.json || true && \
    npx @cyclonedx/cyclonedx-npm --output-file sbom-npm.json --input-file npm-ls-output.json || \
    npx @cyclonedx/cyclonedx-npm --output-file sbom-npm.json --ignore-npm-errors && \
    npx @cyclonedx/cyclonedx-npm --output-format xml --output-file sbom-npm.xml --input-file npm-ls-output.json || \
    npx @cyclonedx/cyclonedx-npm --output-format xml --output-file sbom-npm.xml --ignore-npm-errors

FROM node:22.20-alpine AS runner
WORKDIR /app

# Install security updates and curl for healthcheck, update npm
RUN apk update && apk upgrade && apk add --no-cache curl=8.14.1-r2 && rm -rf /var/cache/apk/* && \
    npm install -g npm@latest

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create non-root user with specific UID/GID
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy built application with proper ownership
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy SBOM files into the image
COPY --from=builder /app/sbom-npm.json /app/sbom/
COPY --from=builder /app/sbom-npm.xml /app/sbom/

# Set proper permissions
RUN chmod -R 755 /app && \
    find /app -type d -exec chmod 755 {} \; && \
    find /app -type f -exec chmod 644 {} \;

# Switch to non-root user
USER nextjs

# Expose port (non-privileged)
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Add labels for security scanning
LABEL maintainer="HarzStorage" \
      version="1.0.0" \
      description="HarzStorage Self-Storage Website" \
      security.scan="enabled" \
      sbom.included="true"

# Health check with proper timeout
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

CMD ["node", "server.js"]
