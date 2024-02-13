<template>
  <div class="flex gap-3 cursor-pointer" @click="onToggle">
    <div
      class="text-primary w-6 h-6 border border-black flex items-center transition-all"
      :class="{ 'bg-primary-light border-primary': model }"
    >
      <Icon v-if="model" class="text-primary w-8 h-8" name="check" />
    </div>
    <div>{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
import Icon from '~/components/general/Icon.vue'
import { useControls } from '~/composables/controls'

const props = withDefaults(
  defineProps<{
    keyValue: string
    label: string
    default?: boolean
  }>(),
  {
    default: false,
  }
)

const key = props.keyValue
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
