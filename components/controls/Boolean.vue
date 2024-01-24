<template>
  <div class="flex gap-3 cursor-pointer" @click="onToggle">
    <div
      class="text-primary w-6 h-6 border border-black flex items-center transition-all"
      :class="{ 'bg-primary border-primary': model }"
    >
      <Icon class="text-black w-8 h-8" name="check" />
    </div>
    <div>{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
import Icon from '~/components/general/Icon.vue'

defineProps<{
  label: string
}>()

const model = defineModel<boolean>({
  default: false,
})

const onToggle = () => {
  model.value = !model.value
}
</script>

<style scoped lang="scss">

</style>
