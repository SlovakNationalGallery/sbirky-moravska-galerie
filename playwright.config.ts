import { defineConfig, devices } from '@playwright/test'

import { fileURLToPath } from 'node:url'

import type { ConfigOptions } from '@nuxt/test-utils/playwright'

const devicesToTest = ['Desktop Chrome'] satisfies Array<string | (typeof devices)[string]>

export default defineConfig<ConfigOptions>({
  testDir: './tests',
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    trace: 'on-first-retry',
    nuxt: {
      rootDir: fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  timeout: 120000,
  projects: devicesToTest.map((p) => (typeof p === 'string' ? { name: p, use: devices[p] } : p)),
})
