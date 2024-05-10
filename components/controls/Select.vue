<template>
  <VDropdown
    class="shrink-0"
    :disabled="isDisabled"
    :distance="6"
    placement="bottom-start"
    @show="isOpen = true"
    @hide="isOpen = false"
  >
    <div
      class="flex transition-all gap-3 py-2 md:py-3 px-3 md:px-4 bg-white serif border-2 cursor-pointer"
      :class="{
        'border-dark': isOpen,
        'border-white': !isOpen,
        'cursor-not-allowed opacity-40': isDisabled,
      }"
    >
      <div class="grow font-serif">
        {{ label }}
        <span v-if="model.length" class="font-sans font-bold">({{ model.length }})</span>
      </div>
      <div
        :class="{ 'rotate-180 text-primary': isOpen }"
        class="transition-all duration-300 ease-out flex"
      >
        <Icon name="arrow" class="w-3" />
      </div>
    </div>

    <template #popper>
      <div
        class="bg-white border-2 border-dark flex flex-col gap-3 p-6 serif overflow-y-scroll max-h-[430px] max-w-[340px]"
      >
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
  </VDropdown>
</template>

<script setup lang="ts">
import levenshtein from 'levenshtein-array'

import Search from '~/components/controls/parts/Search.vue'
import Icon from '~/components/general/Icon.vue'
import { useControls } from '~/composables/controls'

const props = defineProps<{
  name: string
  label: string
}>()

const emit = defineEmits<{
  modelUpdate: []
}>()

const route = useRoute()

const key = props.name
const aggKey = `terms[${key}]`
const filterKey = `filter[${key}][]`
const routeDefault = route.query[key] ? String(route.query[key]) : null

const model = ref(routeDefault ? String(route.query[key]).split('|') : ([] as string[]))

const onToggle = (value: string) => {
  if (model.value.includes(value)) {
    model.value = model.value.filter((v) => v !== value)
  } else {
    model.value = [...model.value, value]
  }
}

const { filters, aggregations, routeParams, options } = await useControls()
aggregations[aggKey] = key

const isOpen = ref(false)
const searchString = ref('')

watch(
  () => model.value,
  (value) => {
    emit('modelUpdate')

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

const isDisabled = computed(() => !sortedOptions.value.length)

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

  function removeAccents(string: string): string {
    return string
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  }

  const filtered = o.filter((l) =>
    removeAccents(l.label).includes(removeAccents(searchString.value))
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

defineExpose({
  selected: computed(() => model.value.map((value) => ({ value, toggle: () => onToggle(value) }))),
  onReset: () => (model.value = []),
  toggle: (value: any) => onToggle(value),
  name: key,
})
</script>
