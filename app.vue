<template>
  <Search v-model="models.q" />
  <div class="flex flex-wrap gap-3 p-10 items-center">
    <component
      :is="item.component"
      v-for="item in controls"
      :key="item.key"
      v-model="models[item.key]"
      :label="item.label"
      :options="item.options"
    />
    <hr />
    <div
      v-for="item in selected"
      :key="`${item.key}-${item.value}`"
      class="bg-primary border-2 border-primary text-white flex items-center p-2 px-3 gap-2 cursor-pointer"
      @click="toggle(item.key, item.value)"
    >
      <div>{{ item.value }}</div>
      <Icon name="close" class="w-3" />
    </div>

    <div
      v-if="selected.length"
      class="flex p-2 px-3 gap-2 border-2 border-dark items-center cursor-pointer"
      @click="reset"
    >
      <Icon class="w-4 h-4" name="rotate" />
      <div>Zrušiť výber</div>
    </div>
  </div>
  <div class="flex flex-col gap-3 p-10">
    <pre>{{ total }} děl</pre>

    <div class="flex flex-wrap">
      <div v-for="item in items" :key="item.id">
        <img
          class="max-w-xs"
          :src="'https://www.webumenia.sk/dielo/nahlad/' + item.id + '/800'"
          alt=""
        />
        <div>{{ item.content.authors_formatted.join(', ') }}</div>
        <div>{{ item.content.title }}</div>
        <div>{{ item.content.dating }}</div>
      </div>
    </div>
    <pre>{{ lastPage }}</pre>
    <pre>{{ page }}</pre>
    <div v-if="lastPage > page" @click="page++">Načítať ďalšie</div>
  </div>
</template>
<script setup lang="ts">
import 'virtual:svg-icons-register'
import Search from "~/components/controls/parts/Search.vue";

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
    key: 'range',
    type: 'range',
    label: 'Rok',
    options: {
      min: 'date_latest',
      max: 'date_earliest',
    },
  },
  {
    key: 'q',
    type: 'hidden',
    label: 'q',
    options: {
      default: '',
    },
  },
] as const

const { controls, models, selected, toggle, reset, items, total, page, lastPage } =
  await useCreateControls(config)
</script>
<style lang="scss">
body {
  background-color: #d9d9d9;
}
</style>
