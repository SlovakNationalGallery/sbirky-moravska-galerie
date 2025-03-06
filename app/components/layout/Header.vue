<template>
  <header class="bg-dark flex flex-col items-center w-full">
    <div class="py-9 w-full max-w-[1320px]">
      <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-5">
        <NuxtLink
          :to="home"
          class="block md:flex gap-8 items-end"
        >
          <div><img
            class="max-h-[50px]"
            :src="Logo"
            :alt="config.public.APP_NAME"
          ></div>
          <div><img class="max-w-[66%] md:max-w-full" :src="Title" alt="Sbírky on-line" /></div>
        </NuxtLink>
        <div class="grow" />
        <div class="links flex gap-4">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :href="link.to"
            class="text-lg text-white border-b-2"
            :class="{ 'router-link-active': link.active }"
          >{{ link.text }}</NuxtLink>
        </div>
      </div>

      <WUSearchBar class="mt-4 md:mt-7" />

      <TransitionExpand>
        <WUFeaturedCollection
          v-if="isFrontpage"
          class="mt-8"
        />
      </TransitionExpand>
    </div>
  </header>
</template>

<script setup lang="ts">
import Logo from '~/assets/svg/logo.svg'
import Title from '~/assets/svg/title.svg'


const route = useRoute()
const { t } = useI18n()
const config = useRuntimeConfig()
const { filterParams, selectedFilters, model } = await useControls()

const home = computed(() => filterParams.value ? `/?${filterParams.value}` : '/')

const links = computed(() => {
  return [
    {
      to: home.value,
      text: t('item.title'),
      active: route.path.startsWith('/items'),
    },
    {
      to: '/about',
      text: t('info.title'),
    },
    { to: '/collections', text: t('collection.title') },
  ]
})

const isFrontpage = computed(() => route.path === '/' && selectedFilters.value.length === 0)
</script>

<style scoped>
.links {
  .router-link-active {
    @apply border-none;
  }
}
</style>
