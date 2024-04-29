<template>
  <div class="flex flex-col items-start gap-4">
    <div class="flex flex-wrap gap-4">
      <component
        :is="item.component"
        v-for="item in components"
        ref="componentRef"
        :key="item.key"
        :name="item.key"
        :label="item.label"
      />
    </div>

    <div class="flex flex-wrap gap-4">
      <Boolean name="has_image" label="Len s obrázkom" :default="true" />
      <Boolean name="has_iip" label="Len so zoomom" />
    </div>

    <div class="flex flex-wrap gap-3">
      <div
        v-for="item in selected"
        :key="`${item?.key}-${item?.value}`"
        class="bg-primary text-white flex items-center py-1 px-3 gap-2 cursor-pointer rounded-3xl"
        @click="item.toggle()"
      >
        <div class="text-xs">{{ item?.value }}</div>
        <Icon name="close" class="w-3" />
      </div>

      <div
        v-if="selected.length"
        class="flex py-1 px-3 gap-2 border-2 border-dark items-center cursor-pointer rounded-3xl"
        @click="onResetAll"
      >
        <Icon class="w-4 h-4" name="rotate" />
        <div class="text-xs">Zrušiť výber</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Select, Range } from '#components'
import Icon from '~/components/general/Icon.vue'
import { useControls } from '~/composables/controls'

const componentRef = ref<InstanceType<typeof Select>[]>([])

const components = [
  {
    component: Select,
    key: 'author',
    label: 'autor',
  },
  {
    component: Select,
    key: 'work_type',
    label: 'výtvarný druh',
  },
  {
    component: Select,
    key: 'topic',
    label: 'námět',
  },
  {
    component: Select,
    key: 'technique',
    label: 'technika',
  },
  {
    component: Select,
    key: 'medium',
    label: 'materiál',
  },
  {
    component: Select,
    key: 'exhibition',
    label: 'výstava',
  },
  {
    component: Range,
    key: {
      min: 'date_earliest',
      max: 'date_latest',
    },
    label: 'roky',
  },
]

const selected = computed(
  () =>
    componentRef.value
      ?.map((c) => c.selected)
      .flat()
      .filter(Boolean) ?? []
)
const { reset } = await useControls()

const onResetAll = () => {
  componentRef.value.forEach((component) => {
    component.onReset?.()
  })
}

onUnmounted(() => {
  reset()
})
</script>
