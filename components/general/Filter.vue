<template>
  <div class="flex flex-col items-start gap-4">
    <div
      v-show="width >= 768"
      class="flex md:flex-wrap gap-4 overflow-x-scroll w-[calc(100%+1rem)] pr-4"
      @click="onToggleMobileMenu"
    >
      <component
        :is="item.component"
        v-for="item in components"
        ref="componentRef"
        :key="item.key"
        :key-value="item.key"
        :label="item.label"
      />
    </div>

    <div
      v-show="width >= 768"
      class="flex flex-col items-start gap-4 transition-opacity"
      :class="{ 'opacity-0': !isReady }"
    >
      <div class="flex flex-wrap gap-4">
        <Boolean key-value="has_image" label="Len s obrázkom" :default="true" />
        <Boolean key-value="has_iip" label="Len so zoomom" />
      </div>

      <div class="flex flex-wrap gap-3">
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
    <FilterMobile
      :is-opened="isMobileMenuOpened"
      :components="components"
      @toggleMenu="onToggleMobileMenu"
      @resetAll="onResetAll"
    />
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

import { Select, Range } from '#components'
import SelectMobile from '~/components/controls/mobile/Select.vue'
import RangeMobile from '~/components/controls/mobile/Range.vue'
import Icon from '~/components/general/Icon.vue'
import { useControls } from '~/composables/controls'
import FilterMobile from '~/components/general/FilterMobile.vue'

const isReady = ref(false)
const isMobileMenuOpened = ref(false)

const { width } = useWindowSize()
const componentRef = ref<InstanceType<typeof Select>[]>([])

const components = [
  {
    component: Select,
    mobileComponent: SelectMobile,
    key: 'author',
    label: 'autor',
  },
  {
    component: Select,
    mobileComponent: SelectMobile,
    key: 'work_type',
    label: 'výtvarný druh',
  },
  {
    component: Select,
    mobileComponent: SelectMobile,
    key: 'topic',
    label: 'námět',
  },
  {
    component: Select,
    mobileComponent: SelectMobile,
    key: 'technique',
    label: 'technika',
  },
  {
    component: Select,
    mobileComponent: SelectMobile,
    key: 'medium',
    label: 'materiál',
  },
  {
    component: Select,
    mobileComponent: SelectMobile,
    key: 'exhibition',
    label: 'výstava',
  },
  {
    component: Range,
    mobileComponent: RangeMobile,
    key: {
      min: 'date_earliest',
      max: 'date_latest',
    },
    label: 'roky',
  },
]

const selected = computed(() => componentRef.value?.map((c) => c.selected).flat() ?? [])
const { refresh, reset } = await useControls()

const onToggleMobileMenu = (event: MouseEvent) => {
  if (width.value >= 768) {
    return
  }

  event.preventDefault()

  isMobileMenuOpened.value = !isMobileMenuOpened.value
}

const onResetAll = () => {
  componentRef.value.forEach((component) => {
    component.onReset?.()
  })
}

onMounted(async () => {
  await nextTick()
  isReady.value = true
  refresh()
})

onUnmounted(() => {
  reset()
})
</script>
