<template>
  <header class="bg-dark flex flex-col items-center w-full">
    <div class="px-4 pt-3 pb-6 md:px-16 md:pt-6 md:pb-12 w-full max-w-[1320px]">
      <div class="flex flex-col md:flex-row items-start md:items-end gap-2 md:gap-5">
        <NuxtLink to="/" class="block md:flex gap-8 items-end">
          <div><img :src="Logo" alt="Moravská galerie" /></div>
          <div><img class="max-w-[66%] md:max-w-full" :src="Title" alt="Sbírky on-line" /></div>
        </NuxtLink>
        <div class="grow"></div>
        <div class="flex gap-4 mb-1">
          <NuxtLink
            to="/"
            class="uppercase text-xl border-b hover:border-transparent"
            :class="
              route.path === '/' || route.fullPath.startsWith('/items')
                ? 'border-transparent text-light'
                : 'border-white text-white'
            "
            >{{ t('item.title') }}</NuxtLink
          >
          <NuxtLink
            to="/collections"
            class="uppercase text-xl border-b hover:border-transparent"
            :class="
              route.fullPath.startsWith('/collections')
                ? 'border-transparent text-light'
                : 'border-white text-white'
            "
            >{{ t('collection.title') }}</NuxtLink
          >
          <NuxtLink
            to="/about"
            class="uppercase text-xl border-b hover:border-transparent"
            :class="
              route.path === '/about' ? 'border-transparent text-light' : 'border-white text-white'
            "
            >{{ t('info.title') }}</NuxtLink
          >
        </div>
      </div>

      <WUSearchBar class="mt-4 md:mt-8" />

      <TransitionExpand>
        <WUFeaturedCollection v-if="isFrontpage" class="mt-8" />
      </TransitionExpand>
    </div>
  </header>
</template>

<script setup lang="ts">
import Logo from '~/assets/svg/logo.svg'
import Title from '~/assets/svg/title.svg'

const route = useRoute()
const { t } = useI18n()

const isFrontpage = computed(() => route.path === '/')
</script>
