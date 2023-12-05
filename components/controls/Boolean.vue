<template>
  <div class="flex gap-3 cursor-pointer" @click="onToggle">
    <div
      class="text-primary w-6 h-6 border-[1px] flex items-center transition-all"
      :class="{ 'bg-primary border-primary': model }"
    >
      <Icon class="text-white w-8 h-8" name="check" />
    </div>
    <div>{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
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
