<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import 'virtual:svg-icons-register'

useHead({
  titleTemplate: (title) =>
    (title ? `${title} | ` : '') + 'Moravská galerie v Brně | sbírky online',
  meta: [
    {
      charset: 'utf-8',
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: '/og-image.png',
    },
    {
      name: 'author',
      content: 'lab.SNG',
    },
  ],
  link: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
    {
      rel: 'mask-icon',
      href: '/safari-pinned-tab.svg',
      color: '#2B2E31',
    },
  ],
})
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
  transform: translateX(0);
}

.page-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

body {
  @apply bg-[#D9D9D9];
}
</style>
