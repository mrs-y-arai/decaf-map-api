import { defineConfig } from 'vitest/config';
import dotenv from 'dotenv';

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
    env: dotenv.config({ path: '.env.test' }).parsed,
    alias: {
      '~': '/src',
    },
  },
});
