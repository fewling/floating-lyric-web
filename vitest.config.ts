import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  test: {
    // .test.ts only, never .tsx: tsconfig's jsx:"preserve" breaks Vitest on JSX imports.
    // Component behavior is covered by Playwright e2e instead.
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
})
