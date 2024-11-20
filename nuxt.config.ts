import { createRedirects } from './redirects'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import { resolve } from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2024-10-01',
  devtools: {
    enabled: true,
  },
  debug: true,
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    renderJsonPayloads: false,
  },
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/tailwindcss',
    '@morev/vue-transitions/nuxt',
    'vue3-carousel-nuxt',
    'floating-vue/nuxt',
    '@zadigetvoltaire/nuxt-gtm',
    '@nuxtjs/i18n',
  ],
  carousel: {
    prefix: 'Module',
  },
  sitemap: {
    cacheMaxAgeSeconds: process.env.NODE_ENV === 'production' ? 60 * 60 * 24 * 31 : 0,
    autoI18n: false,
    sitemaps: false,
  },
  components: {
    dirs: ['@/components/controls'],
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  gtm: {
    id: process.env.GTM_ID || '',
    enabled: process.env.NODE_ENV === 'production',
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
    optimizeDeps: { exclude: ['fsevents'], include: ['vue3-carousel'] },
    server: {
      preTransformRequests: false,
    },
  },
  i18n: {
    locales: ['cs'],
    defaultLocale: 'cs',
    vueI18n: './i18n.config.ts',
  },
  routeRules: createRedirects(),
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
