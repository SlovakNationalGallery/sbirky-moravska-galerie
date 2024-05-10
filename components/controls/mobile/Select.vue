<template>
  <div class="flex flex-col gap-3 serif">
    <Search v-model="searchString" />
    <div
      v-for="option in sortedOptions"
      :key="option.value"
      class="flex items-center gap-2 cursor-pointer"
      @click="onToggle(option.value)"
    >
      <div
        class="text-primary w-6 h-6 border flex items-center transition-all"
        :class="{ 'bg-primary-light border-primary': model.includes(option.value) }"
      >
        <Icon v-if="model.includes(option.value)" class="text-primary w-8 h-8" name="check" />
      </div>
      <div>
        {{ option.label }} <span class="font-sans font-bold">({{ option.count }})</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import levenshtein from 'levenshtein-array'

import Search from '~/components/controls/parts/Search.vue'
import Icon from '~/components/general/Icon.vue'
import { useControls } from '~/composables/controls'

const props = defineProps<{
  keyValue: string
  label: string
}>()

const route = useRoute()

const key = props.keyValue
const aggKey = `terms[${key}]`
const filterKey = `filter[${key}][]`
const routeDefault = route.query[key] ? String(route.query[key]) : null

const onToggle = (value: string) => {
  if (model.value.includes(value)) {
    model.value = model.value.filter((v) => v !== value)
  } else {
    model.value = [...model.value, value]
  }
}

const { filters, aggregations, routeParams, options } = await useControls()
aggregations[aggKey] = key

const model = ref(routeDefault ? String(route.query[key]).split('|') : ([] as string[]))
const searchString = ref('')
const selected = defineModel<number>()

watch(
  () => model.value,
  (value) => {
    selected.value = value.length

    if (value.length) {
      filters[filterKey] = value
    } else {
      delete filters[filterKey]
    }

    if (value.length) {
      routeParams[key] = value.join('|')
    } else {
      delete routeParams[key]
    }
  },
  {
    immediate: true,
  }
)

const sortedOptions = computed(() => {
  const o = options.value?.[key]?.map((l) => ({
    label: l.value,
    value: l.value,
    count: l.count,
  }))

  if (!o) {
    return []
  }

  if (!searchString.value) {
    return o
  }

  function normalize(string: string): string {
    return string
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  }

  const filtered = o.filter((l) =>
    normalize(l.label).includes(normalize(normalize(searchString.value)))
  )

  const sorted = levenshtein(
    filtered.map((l) => l.label),
    searchString.value
  ).sort((a, b) => a.l - b.l)

  return sorted.map((l, i) => ({
    label: filtered[i].label,
    value: filtered[i].value,
    count: filtered[i].count,
  }))
})
</script>
