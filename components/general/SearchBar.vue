<template>
  <div class="relative">
    <Search v-model="q" prepend-icon @focus="isOpen = true" @blur="isOpen = false" />
    <transition-fade>
      <div v-if="isOpen && items.length" class="bg-white absolute top-100% w-full p-4 z-30">
        <div>Díla</div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" @click="isOpen = false">
          <NuxtLink v-for="item in items" :key="item.id" :to="item.link" class="flex mt-4">
            <Image :url="item.image" class="!w-[56px] h-[56px] object-cover mr-4" />
            <div>
              <div class="font-serif">{{ item.content.authors.join(', ') }}</div>
              <div>{{ item.content.title }}</div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </transition-fade>
  </div>
</template>

<script setup lang="ts">
import Search from '~/components/controls/parts/Search.vue'
import Item from '~/models/Item'
import Image from '~/components/general/Image.vue'

const q = ref('')
const isOpen = ref(false)

const nuxtConfig = useRuntimeConfig()
const { data } = await useFetch<{
  data: any[]
}>('api/v2/items/suggestions', {
  baseURL: nuxtConfig.public.APP_URL,
  params: {
    search: q,
    size: 9,
  },
  watch: [q],
})

const items = computed(
  () => data.value?.data.map((item) => new Item({ id: item.id, content: item })) ?? []
)
</script>

<style scoped lang="scss">

</style>
