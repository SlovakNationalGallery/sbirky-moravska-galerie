<template>
  <button
    v-if="lastPage > model"
    ref="target"
    type="button"
    class="inline-flex px-6 py-4 uppercase w-auto items-center text-md bg-dark text-white"
    @click="onClick"
  >
    <transition-slide mode="out-in">
      <div v-if="!isLoading" class="flex">
        <span>Načítať ďalšie</span>
        <Icon name="arrow-down" class="w-5 h-5 ml-1.5" />
      </div>
      <div v-else>Načítavam...</div>
    </transition-slide>
  </button>
</template>
<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

import Icon from '~/components/general/Icon.vue'

defineProps<{
  isLoading: boolean
  lastPage: number
}>()

const model = defineModel<number>({
  default: 1,
})

const target = ref(null)
const isPagerEnabled = ref(false)

const onClick = () => {
  model.value += 1
  isPagerEnabled.value = true
}

const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting && isPagerEnabled.value) {
    model.value += 1
  }
})

onUnmounted(() => {
  stop()
})
</script>
