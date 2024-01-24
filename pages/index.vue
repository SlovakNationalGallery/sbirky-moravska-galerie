<template>
  <div class="flex flex-col gap-3 items-center">
    <Filter
      v-model="models"
      class="w-full"
      :controls="controls"
      :selected="selected"
      :toggle="toggle"
      :reset="reset"
    />

    <div class="w-full my-4 flex">
      <div class="flex-grow">
        <span class="font-bold">{{ total }}</span> děl
      </div>
      <div class="border-b-2 border-black">
        <Dropdown v-model="sortBy" :options="sortOptions" />
      </div>
    </div>

    <div class="w-full">
      <masonry-wall :items="items" :ssr-columns="3" :column-width="300" :gap="24">
        <template #default="{ item }">
          <Item :key="`item-${item.id}`" :item="item" />
        </template>
      </masonry-wall>
    </div>

    <button
      v-if="lastPage > page"
      type="button"
      class="inline-flex px-6 py-4 uppercase w-auto items-center text-md bg-dark text-white"
      @click="page++"
    >
      <span>Načítať ďalšie</span>
      <Icon name="arrow-down" class="w-5 h-5 ml-1.5" />
    </button>
  </div>
</template>
<script setup lang="ts">
import Filter from '~/components/general/Filter.vue'
import Dropdown from '~/components/general/Dropdown.vue'
import Item from '~/components/general/Item.vue'
import Icon from '~/components/general/Icon.vue'

const sortOptions = [
  { label: 'Podľa poslednej zmeny', value: 'last_update' },
  { label: 'test2', value: 'test2' },
] as const

const config = [
  {
    key: 'author',
    type: 'select',
    label: 'autor',
  },
  {
    key: 'work_type',
    type: 'select',
    label: 'výtvarný druh',
  },
  {
    key: 'topic',
    type: 'select',
    label: 'námět',
  },
  {
    key: 'technique',
    type: 'select',
    label: 'technika',
  },
  {
    key: 'medium',
    type: 'select',
    label: 'materiál',
  },
  {
    key: 'exhibition',
    type: 'select',
    label: 'výstava',
  },
  {
    key: 'range',
    type: 'range',
    label: 'Rok',
    options: {
      min: 'date_latest',
      max: 'date_earliest',
    },
  },
  {
    key: 'has_image',
    type: 'boolean',
    label: 'Len s obrázkom',
  },
  {
    key: 'has_iip',
    type: 'boolean',
    label: 'Len so zoomom',
  },
  {
    key: 'q',
    type: 'hidden',
    label: 'q',
    options: {
      default: '',
    },
  },
  // {
  //   key: 'gallery',
  //   type: 'hidden',
  //   label: 'gallery',
  //   options: {
  //     default: 'Moravská galerie, MG',
  //   },
  // },
] as const

const { controls, models, selected, toggle, reset, items, total, page, lastPage, sortBy } =
  await useCreateControls(config)
</script>
