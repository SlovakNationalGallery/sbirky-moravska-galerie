// https://nuxt.com/docs/api/configuration/nuxt-config
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import { resolve } from 'path'

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@morev/vue-transitions/nuxt'],
  components: {
    dirs: ['@/components/general'],
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
      API_URL: process.env.PUBLIC_API_URL || '/api',
      APP_URL: process.env.APP_URL || '',
    },
  },
})
