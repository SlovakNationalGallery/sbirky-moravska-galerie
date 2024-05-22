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
    '@zadigetvoltaire/nuxt-gtm',
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
    optimizeDeps: { exclude: ['fsevents'] },
  },

  runtimeConfig: {
    API_URL: process.env.API_URL || '/api',
    APP_URL: process.env.APP_URL || '',
    public: {
      API_URL: process.env.API_URL || '/api',
      APP_URL: process.env.APP_URL || '',
      CDN_URL: process.env.CDN_URL || '',
    },
  },
})
