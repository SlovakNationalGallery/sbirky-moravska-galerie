<template>
  <div class="flex flex-wrap gap-3 items-center">
    <template v-for="item in controls" :key="item.key">
      <component
        :is="item.component"
        v-if="item.component"
        v-model="models[item.key]"
        :label="item.label"
        :options="item.options"
      />
    </template>
    <hr />

    <div
      v-for="item in selected"
      :key="`${item.key}-${item.value}`"
      class="bg-primary border-2 border-primary text-white flex items-center p-2 px-3 gap-2 cursor-pointer"
      @click="toggle(item.key, item.value)"
    >
      <div>{{ item.value }}</div>
      <Icon name="close" class="w-3" />
    </div>

    <div
      v-if="selected.length"
      class="flex p-2 px-3 gap-2 border-2 border-dark items-center cursor-pointer"
      @click="reset"
    >
      <Icon class="w-4 h-4" name="rotate" />
      <div>Zrušiť výber</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '~/components/general/Icon.vue'

defineProps<{
  controls: {
    key: string
    type: string
    label: string
    options?: Record<string, string>
    component?: string
  }[]
  selected: { key: string; value: string }[]
  toggle: (key: string, value: string) => void
  reset: () => void
}>()

const models = defineModel<Record<string, string[]>>({
  default: {},
})
</script>

<style scoped lang="scss">

</style>
