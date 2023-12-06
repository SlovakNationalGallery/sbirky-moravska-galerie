<template>
  <Popper placement="bottom-start" @open:popper="isOpen = true" @close:popper="isOpen = false">
    <div
      class="flex transition-all gap-3 py-3 px-4 bg-white serif border-2 cursor-pointer"
      :class="{ 'border-dark': isOpen, 'border-white': !isOpen }"
    >
      <div class="grow">
        {{ label }}
      </div>
      <div
        :class="{ 'rotate-180 text-primary': isOpen }"
        class="transition-all duration-300 ease-out flex"
      >
        <Icon name="arrow" class="w-3" />
      </div>
    </div>
    <template #content>
      <div
        class="bg-white border-2 border-dark flex flex-col gap-3 p-6 serif overflow-y-scroll max-h-[430px] min-w-[340px]"
      >
        <Slider v-model="sliderModel"  v-bind="{...sliderOptions}"  />
        <div class="flex" v-if="model">
          <input class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" v-model="model.min">
          <input class="text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" v-model="model.max">
        </div>
      </div>
    </template>
  </Popper>
</template>

<script setup lang="ts">
import Popper from 'vue3-popper'
import Slider from '@vueform/slider'
import '@vueform/slider/themes/default.css'

const props = defineProps<{
  label: string
  options: { min: number; max: number;}
}>()

const model = defineModel<{
  min: number
  max: number
}>({
  default: {
    min: null,
    max: null,
  },
})

onMounted(() => {
  if(!model.value?.min) {
    model.value.min = props.options.min
  }

  if(!model.value?.max) {
    model.value.max = props.options.max
  }
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

const sliderOptions = {
  lazy: true,
  min: props.options.min,
  max: props.options.max,
  tooltips: false
}


const isOpen = ref(false)

</script>
