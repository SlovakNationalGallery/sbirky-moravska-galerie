import * as Sentry from '@sentry/vue'

import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(({ vueApp }) => {
  const config = useRuntimeConfig()

  if (!config.public.SENTRY_DSN || config.public.ENV === 'development') {
    return
  }

  const router = useRouter()

  Sentry.init({
    app: vueApp,
    dsn: config.public.SENTRY_DSN,
    release: `${config.public.APP_NAME}@${config.public.APP_VERSION}`,
    environment: config.public.ENV,
    integrations: [Sentry.browserTracingIntegration({ router }), Sentry.replayIntegration()],
    sampleRate: Number(config.public.SENTRY_SAMPLE_RATE),
    tracesSampleRate: Number(config.public.SENTRY_TRACES_SAMPLE_RATE),
    replaysSessionSampleRate: Number(config.public.SENTRY_REPLAY_SAMPLE_RATE),
    ignoreErrors: ['No error message'],
  })
})
