<template>
  <div class="flex flex-col gap-3 mx-3 serif max-h-[430px]">
    <Slider v-model="sliderModel" v-bind="{ ...sliderOptions }" @change="isDirty = true" />
    <div v-if="model" class="flex">
      <input
        v-model="model.min"
        class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        type="number"
      />
      <input
        v-model="model.max"
        class="text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        type="number"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Slider from '@vueform/slider'

import '@vueform/slider/themes/default.css'
import { useControls } from '~/composables/controls'

const props = defineProps<{
  label: string
  keyValue: { min: string; max: string }
}>()

const keyMin = props.keyValue.min
const aggKeyMin = `min[${keyMin}]`
const filterKeyMin = `filter[${keyMin}][gte]`
const keyMax = props.keyValue.max
const aggKeyMax = `max[${keyMax}]`
const filterKeyMax = `filter[${keyMax}][lte]`

const route = useRoute()

const { filters, aggregations, routeParams, options } = await useControls()
aggregations[aggKeyMin] = keyMin
aggregations[aggKeyMax] = keyMax

const routeDefaultMin = Number(route.query[keyMin])
const routeDefaultMax = Number(route.query[keyMax])
const isDirty = ref(!!routeDefaultMin || !!routeDefaultMax)

const model = ref({
  min: routeDefaultMin ? routeDefaultMin : options.value?.[keyMin],
  max: routeDefaultMax ? routeDefaultMax : options.value?.[keyMax],
})

const sliderModel = computed({
  get: () => [model.value?.min, model.value?.max],
  set: (value) => {
    model.value = {
      min: value[0]!,
      max: value[1]!,
    }
  },
})

const sliderOptions = computed(() => ({
  lazy: true,
  min: options.value?.[keyMin],
  max: options.value?.[keyMax],
  tooltips: false,
}))

watch(options, () => {
  if (!isDirty.value) {
    model.value = {
      min: options.value?.[keyMin],
      max: options.value?.[keyMax],
    }
  }
})

watch(
  [model, isDirty],
  () => {
    if (isDirty.value) {
      routeParams[keyMin] = String(model.value.min)
      routeParams[keyMax] = String(model.value.max)

      filters[filterKeyMin] = model.value.min
      filters[filterKeyMax] = model.value.max
    } else {
      delete routeParams[keyMin]
      delete routeParams[keyMax]
      delete filters[filterKeyMin]
      delete filters[filterKeyMax]
    }
  },
  {
    deep: true,
  }
)
</script>
