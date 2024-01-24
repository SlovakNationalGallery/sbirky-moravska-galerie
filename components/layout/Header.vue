<template>
  <header class="bg-dark">
    <div>
      <NuxtLink to="/" class="block md:flex gap-8 items-end">
        <div><img :src="Logo" alt="Moravská galerie" /></div>
        <div><img class="max-w-[66%] md:max-w-full" :src="Title" alt="Sbírky on-line" /></div>
      </NuxtLink>

      <SearchBar class="mt-8" />

      <Image v-if="isFrontpage" url="/placeholder.png" class="aspect-[9/4] mt-8 object-cover" />
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

<style scoped lang="scss">

</style>
