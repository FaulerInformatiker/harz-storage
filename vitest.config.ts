import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: [
      'app/**/*.{test,spec}.{js,ts,jsx,tsx}',
      'components/**/*.{test,spec}.{js,ts,jsx,tsx}',
      'lib/**/*.{test,spec}.{js,ts,jsx,tsx}',
      'tests/security/**/*.{test,spec}.{js,ts,jsx,tsx}',
      'tests/contract/**/*.{test,spec}.{js,ts,jsx,tsx}',
    ],
    exclude: [
      'node_modules/',
      '.next/',
      'coverage/',
      'playwright-report/',
      'test-results/',
      'tests/e2e/**',
      '**/*.d.ts',
      '**/*.config.{js,ts}',
      '**/mock-api/**',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        '.next/',
        'coverage/',
        'playwright-report/',
        'test-results/',
        'tests/e2e/**',
        'tests/contract/**',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        '**/mock-api/**',
        '**/__tests__/**',
        '**/tests/**',
        'scripts/**',
        'eslint-rules/**',
        'app/agb/**',
        'app/datenschutz/**',
        'app/impressum/**',
        'app/layout.tsx',
        'components/Advantages.tsx',
        'lighthouserc.js',
      ],
      thresholds: {
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
