import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.spec.ts'],
    environment: 'node',
    coverage: {
      enabled: true,
      provider: 'v8',
      all: true,
      reportsDirectory: 'test-reports',
    },
    alias: {
      '~': '/src',
    },
  },
});
