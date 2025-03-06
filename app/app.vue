<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import 'virtual:svg-icons-register'

const config = useRuntimeConfig()
const { t } = useI18n()

const filterConfig = [
  {
    key: 'author',
    type: 'select',
    label: t('item.attribute.author'),
  },
  {
    key: 'work_type',
    type: 'select',
    label: t('item.attribute.workType'),
  },
  {
    key: 'topic',
    type: 'select',
    label: t('item.attribute.topic'),
  },
  {
    key: 'technique',
    type: 'select',
    label: t('item.attribute.technique'),
  },
  {
    key: 'medium',
    type: 'select',
    label: t('item.attribute.medium'),
  },
  {
    key: 'exhibition',
    type: 'select',
    label: t('item.attribute.exhibition'),
  },
  {
    key: 'years',
    type: 'range',
    label: t('item.attribute.dateRange'),
    extra: {
      rangeKeys: {
        min: 'date_earliest',
        max: 'date_latest',
      },
    },
  },
  {
    key: 'hr',
    type: 'hr',
  },
  {
    key: 'has_image',
    type: 'boolean',
    label: t('controls.filter.hasImage'),
    defaultValue: true,
  },
  {
    key: 'has_iip',
    type: 'boolean',
    label: t('controls.filter.hasIip'),
    // defaultValue: true,
  },
]

const controls = await useControls()
controls.init(filterConfig)

useHead({
  titleTemplate: (title) =>
    (title ? `${title} | ` : '') + 'Moravská galerie v Brně | sbírky online',
  meta: [
    {
      charset: 'utf-8',
    },
    {
      property: 'og:image',
      content: '/og-image.png',
    },
    {
      name: 'author',
      content: 'lab.SNG',
    },
    {
      name: 'description',
      content:
        'Kompletní on-line zveřejnění sbírek Moravské galerie v Brně. Webová stránka umožňuje uživateli vyhledávat sbírkové předměty dle autora, techniky, výtvarného žánru, materiálu, námětu a také místa vzniku',
    },
    {
      property: 'og:site_name',
      content: 'Moravská galerie v Brně | sbírky online',
    },
    {
      property: 'og:description',
      content:
        'Kompletní on-line zveřejnění sbírek Moravské galerie v Brně. Webová stránka umožňuje uživateli vyhledávat sbírkové předměty dle autora, techniky, výtvarného žánru, materiálu, námětu a také místa vzniku',
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
