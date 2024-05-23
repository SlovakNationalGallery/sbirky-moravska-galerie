<template>
  <NuxtLink v-if="featured" :to="`/collections/${featured.id}`" class="relative">
    <Image :url="featured.header_image_src" class="aspect-[9/4] mt-8 object-cover w-full" />
    <div
      class="absolute top-1/2 left-1/2 text-white text-3xl lg:text-6xl text-center -translate-x-1/2 -translate-y-1/2 [text-shadow:0_0.05em_0.2em_rgba(0,0,0,0.8)]"
    >
      <p>{{ featured.name }}</p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import Image from '~/components/general/Image.vue'
import Collection from '~/models/Collection'
import { useBaseFetch } from '~/composables/fetch'

interface Response {
  data: Collection[]
}

const nuxtConfig = useRuntimeConfig()

const collections = await useBaseFetch<Response>('api/collections', {
  query: { featured: true },
  transform: (response) => ({
    ...response,
    data: response.data.map((data) => new Collection(data)),
  }),
})

const featured = computed(() => collections.data.value?.data[0] ?? null)
</script>
