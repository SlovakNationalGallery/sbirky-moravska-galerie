<template>
  <div class="flex flex-col gap-3 items-center">
    <Filter class="w-full" />

    <div class="w-full my-4 flex">
      <div class="flex-grow">
        <span class="font-bold">{{ total }}</span> děl
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
          <Item :key="`item-${item.id}`" :item="item" />
        </template>
      </masonry-wall>
    </div>

    <Pager v-model="page" :is-loading="isLoading" :last-page="lastPage" />
  </div>
</template>
<script setup lang="ts">
import Filter from '~/components/general/Filter.vue'
import Item from '~/components/general/Item.vue'
import Sort from '~/components/general/Sort.vue'
import Pager from '~/components/general/Pager.vue'
import { useControls } from '~/composables/controls'

const { items, total, page, lastPage, isLoading, sortBy, sortDirection } = await useControls()
</script>
