<template>
  <input v-model="model" type="hidden" />
</template>

<script setup lang="ts">
import { useControls } from '~/composables/controls'

const props = defineProps<{ name: string }>()

const key = props.name
const aggKey = `terms[${key}]`
const filterKey = `filter[${key}]`

const { filters, aggregations, routeParams } = await useControls()
aggregations[aggKey] = key
const route = useRoute()

const model = ref(route.query[key] as string | undefined)

watch(
  () => model.value,
  (value) => {
    if (value) {
      filters[filterKey] = value
    } else {
      delete filters[filterKey]
    }

    if (value) {
      routeParams[key] = value
    } else {
      delete routeParams[key]
    }
  },
  {
    immediate: true,
  }
)

const clear = () => {
  model.value = undefined
}

defineExpose({
  toggle: clear,
  onReset: clear,
  name: key,
})
</script>
