<template>
  <div class="flex flex-col items-center">
    <TransitionExpand>
      <Image v-if="isReady" url="/placeholder.png" class="max-h-[400px] w-full mt-8 object-cover" />
    </TransitionExpand>

    <div class="max-w-[740px]">
      <h2 class="text-3xl md:text-5xl md:text-center mt-10 mb-6">Kolekcie</h2>

      <div class="md:text-xl md:text-center">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.
      </div>

      <div class="flex justify-center gap-3 my-6">
        <div
          class="bg-primary text-white flex items-center py-1 px-3 gap-2 cursor-pointer rounded-3xl"
        >
          <div class="text-xs">
            <span class="font-bold">Autor:</span> Meno Priezvisko, Meno Priezvisko Ml.
          </div>
        </div>

        <div
          class="bg-primary text-white flex items-center py-1 px-3 gap-2 cursor-pointer rounded-3xl"
        >
          <div class="text-xs"><span class="font-bold">Technika:</span> Sietotlač, Rinolit</div>
        </div>
      </div>
    </div>

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
  </div>
</template>

<script setup lang="ts">
import Image from '~/components/general/Image.vue'
import Item from '~/components/general/Item.vue'
import { useControls } from '~/composables/controls'
import Sort from '~/components/general/Sort.vue'
import Icon from '~/components/general/Icon.vue'

const isReady = ref(false)
const { items, total, page, lastPage, isLoading, sortBy, sortDirection } = await useControls()

onMounted(async () => {
  await new Promise((resolve) => setTimeout(resolve, 333))
  isReady.value = true
})
</script>
