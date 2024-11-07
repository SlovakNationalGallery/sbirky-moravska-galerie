<template>
  <VDropdown :distance="6" placement="bottom-start" @show="isOpen = true" @hide="isOpen = false">
    <div
      class="flex transition-all gap-3 py-2 md:py-3 px-3 md:px-4 bg-white serif border-2 cursor-pointer"
      :class="{ 'border-dark': isOpen, 'border-white': !isOpen }"
    >
      <div class="grow font-serif">
        {{ label }}
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
        class="bg-white border-2 border-dark flex flex-col gap-3 p-6 serif overflow-y-scroll max-h-[430px] min-w-[340px]"
      >
        <Slider v-model="sliderModel" v-bind="{ ...sliderOptions }" @change="isDirty = true" />
        <div v-if="model" class="flex">
          <input v-model="model.min" type="text" inputmode="numeric" pattern="-?\d*" />
          <input
            v-model="model.max"
            class="text-right"
            type="text"
            inputmode="numeric"
            pattern="-?\d*"
          />
        </div>
      </div>
    </template>
  </VDropdown>
</template>

<script setup lang="ts">
import Slider from '@vueform/slider'

import '@vueform/slider/themes/default.css'
import Icon from '~/components/general/Icon.vue'
import { useControls } from '~/composables/controls'

const props = defineProps<{
  label: string
  name: { min: string; max: string }
}>()

const keyMin = props.name.min
const aggKeyMin = `min[${keyMin}]`
const filterKeyMin = `filter[${keyMin}][gte]`
const keyMax = props.name.max
const aggKeyMax = `max[${keyMax}]`
const filterKeyMax = `filter[${keyMax}][lte]`

const route = useRoute()

const onReset = () => {
  model.value = { min: options.value?.[keyMin], max: options.value?.[keyMax] }
  isDirty.value = false
}

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

defineExpose({
  selected: computed(() =>
    isDirty.value && model.value
      ? [{ value: `${model.value.min} – ${model.value.max}`, toggle: onReset }]
      : []
  ),
  onReset,
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

const isOpen = ref(false)

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
