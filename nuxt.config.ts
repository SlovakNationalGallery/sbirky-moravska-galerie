import { createRedirects } from './redirects'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import { resolve } from 'path'

const extendPaths = process.env.EXTEND_LOCAL
  ? ['../online-collections-components']
  : ['github:SlovakNationalGallery/online-collections-components#v1.0.0']

export default defineNuxtConfig({
  extends: extendPaths,
  compatibilityDate: '2024-10-01',
  devtools: {
    enabled: true,
  },
  debug: false,
  future: {
    compatibilityVersion: 4,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  gtm: {
    id: process.env.GTM_ID || '',
    enabled: process.env.NODE_ENV === 'production',
  },
  modules: ['@nuxtjs/tailwindcss'],
  vite: {
    plugins: [
      // TODO: replace with NuxtIcon
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'app/assets/icons')],
        symbolId: 'icon-[name]',
      }),
    ],
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
      APP_X_FRONTEND: process.env.APP_X_FRONTEND || 'moravska-galerie',
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
  sitemap: {
    sitemaps: true,
  },
})
