<template>
  <div class="flex flex-col items-center">
    <div class="max-w-[740px]">
      <h2 class="text-3xl md:text-5xl md:text-center mt-10 mb-6">Kolekcie</h2>
    </div>

    <div class="w-full my-4 flex">
      <div class="flex-grow">
        <span class="font-bold">{{ total }}</span> kolekcií
      </div>

      <Sort v-model:sort-by="sortBy" v-model:sort-direction="sortDirection" />
    </div>

    <div v-if="items.length" class="w-full">
      <masonry-wall
        :items="items"
        :ssr-columns="3"
        :column-width="300"
        :gap="24"
        :key-mapper="(item: Item) => item.id"
      >
        <template #default="{ item }">
          <Collection :key="`item-${item.id}`" :item="item" />
        </template>
      </masonry-wall>
    </div>
  </div>
</template>

<script setup lang="ts">
import Item from '~/components/general/Item.vue'
import { useControls } from '~/composables/controls'
import Sort from '~/components/general/Sort.vue'
import Collection from '~/components/general/Collection.vue'

const isReady = ref(false)
const { items, total, page, lastPage, isLoading, sortBy, sortDirection } = await useControls()

onMounted(async () => {
  await new Promise((resolve) => setTimeout(resolve, 333))
  isReady.value = true
})
</script>
