// https://nuxt.com/docs/api/configuration/nuxt-config
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import { resolve } from 'path'

export default defineNuxtConfig({
  devtools: { enabled: false },
  debug: false,
  experimental: {
    renderJsonPayloads: false,
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@morev/vue-transitions/nuxt',
    'vue3-carousel-nuxt',
    'floating-vue/nuxt',
  ],
  carousel: {
    prefix: 'Module',
  },
  components: {
    dirs: ['@/components/controls'],
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  vite: {
    vue: {
      script: {
        defineModel: true,
      },
    },
    plugins: [
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'assets/icons')],
        symbolId: 'icon-[name]',
      }),
    ],
    optimizeDeps: { exclude: ['fsevents'] },
  },

  runtimeConfig: {
    API_URL: process.env.API_URL || '/api',
    APP_URL: process.env.APP_URL || '',
    public: {
      API_URL: process.env.API_URL || '/api',
      APP_URL: process.env.APP_URL || '',
      CDN_URL: process.env.CDN_URL || '',

      APP_NAME: process.env.npm_package_name,
      APP_VERSION: process.env.npm_package_version,
      APP_REVISION: process.env.CI_COMMIT_SHORT_SHA || '',

      SENTRY_DSN: process.env.SENTRY_DSN || '',
      SENTRY_SAMPLE_RATE: process.env.SENTRY_SAMPLE_RATE || '1',
      SENTRY_TRACES_SAMPLE_RATE: process.env.SENTRY_TRACES_SAMPLE_RATE || '0',
      SENTRY_REPLAY_SAMPLE_RATE: process.env.SENTRY_REPLAY_SAMPLE_RATE || '0.1',
    },
  },
})
