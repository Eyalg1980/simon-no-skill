/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Served from https://eyalg1980.github.io/simon-no-skill/ (ADR-8, repo name per CLAUDE.md).
export const BASE_PATH = '/simon-no-skill/';

export default defineConfig({
  base: BASE_PATH,
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
