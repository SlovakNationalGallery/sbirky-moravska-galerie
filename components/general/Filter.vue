<template>
  <div class="flex flex-col items-start gap-4">
    <div class="flex flex-wrap gap-4">
      <template v-for="item in controls" :key="`control-${item.key}`">
        <component
          :is="item.component"
          v-if="item.component"
          v-model="models[item.key]"
          :label="item.label"
          :options="item.options"
        />
      </template>
    </div>

    <div class="flex flex-wrap gap-4">
      <template v-for="item in booleans" :key="`control-${item.key}`">
        <component
          :is="item.component"
          v-if="item.component"
          v-model="models[item.key]"
          :label="item.label"
          :options="item.options"
        />
      </template>
    </div>

    <div class="flex flex-wrap gap-3">
      <div
        v-for="item in selected"
        :key="`${item.key}-${item.value}`"
        class="bg-primary text-white flex items-center py-1 px-3 gap-2 cursor-pointer rounded-3xl"
        @click="toggle(item.key, item.value)"
      >
        <div class="text-xs">{{ item.value }}</div>
        <Icon name="close" class="w-3" />
      </div>

      <div
        v-if="selected.length"
        class="flex py-1 px-3 gap-2 border-2 border-dark items-center cursor-pointer rounded-3xl"
        @click="reset"
      >
        <Icon class="w-4 h-4" name="rotate" />
        <div class="text-xs">Zrušiť výber</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '~/components/general/Icon.vue'

const props = defineProps<{
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

const controls = computed(() => props.controls.filter((item) => item.type !== 'boolean'))
const booleans = computed(() => props.controls.filter((item) => item.type === 'boolean'))

const models = defineModel<Record<string, string[]>>({
  default: {},
})
</script>
