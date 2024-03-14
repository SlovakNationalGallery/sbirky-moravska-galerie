<template>
  <div class="flex gap-3 cursor-pointer items-center" @click="onToggle">
    <input v-model="model" type="checkbox" class="text-primary p-3" />

    <div>{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
import { useControls } from '~/composables/controls'

const props = withDefaults(
  defineProps<{
    name: string
    label: string
    default?: boolean
  }>(),
  {
    default: false,
  }
)

const key = props.name
const aggKey = `terms[${key}]`
const filterKey = `filter[${key}]`

const { filters, aggregations, routeParams } = await useControls()
aggregations[aggKey] = key
const route = useRoute()

const model = ref(route.query[key] === 'true' ? true : props.default)

watch(
  () => model.value,
  (value) => {
    if (value) {
      filters[filterKey] = value
    } else {
      delete filters[filterKey]
    }

    if (value) {
      routeParams[key] = 'true'
    } else {
      delete routeParams[key]
    }
  },
  {
    immediate: true,
  }
)

const onToggle = () => (model.value = !model.value)
</script>
