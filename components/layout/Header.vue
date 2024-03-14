<template>
  <header class="bg-dark flex flex-col items-center w-full">
    <div class="px-4 pt-3 pb-6 md:px-16 md:pt-6 md:pb-12 w-full max-w-[1320px]">
      <div class="flex flex-col md:flex-row items-start md:items-end gap-2 md:gap-5">
        <NuxtLink to="/" class="block md:flex gap-8 items-end">
          <div><img :src="Logo" alt="Moravská galerie" /></div>
          <div><img class="max-w-[66%] md:max-w-full" :src="Title" alt="Sbírky on-line" /></div>
        </NuxtLink>
        <div class="grow"></div>
        <div class="flex gap-3">
          <NuxtLink to="/" class="text-white uppercase text-xl">Díla</NuxtLink>
          <NuxtLink to="/collections" class="text-white uppercase text-xl border-b border-white"
            >Kolekce</NuxtLink
          >
          <NuxtLink to="/about" class="text-white uppercase text-xl border-b border-white"
            >Info</NuxtLink
          >
        </div>
      </div>

      <SearchBar class="mt-4 md:mt-8" />

      <TransitionExpand>
        <Image v-if="isFrontpage" url="/placeholder.png" class="aspect-[9/4] mt-8 object-cover" />
      </TransitionExpand>
    </div>
  </header>
</template>

<script setup lang="ts">
import Logo from '~/assets/svg/logo.svg'
import Title from '~/assets/svg/title.svg'
import SearchBar from '~/components/general/SearchBar.vue'
import Image from '~/components/general/Image.vue'

const route = useRoute()

const isFrontpage = computed(() => route.path === '/')
</script>
