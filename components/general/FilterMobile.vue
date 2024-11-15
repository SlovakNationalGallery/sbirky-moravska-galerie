<template>
  <div
    v-show="width < 768"
    class="flex py-2 w-full justify-center items-center gap-3 text-dark border border-dark"
    @click="onCloseMenu"
  >
    <Icon class="w-5 h-5" name="filter" />
    <span class="uppercase">{{ t('controls.filter.show') }}</span>
  </div>

  <TransitionSlide>
    <div v-if="isOpened" class="fixed inset-0 top-10 flex flex-col bg-white z-50">
      <div class="flex flex-col h-full">
        <div class="flex p-6">
          <TransitionSlide group mode="out-in" class="grow">
            <div v-if="!submenu" class="text-lg font-bold">{{ t('controls.filter.title') }}</div>
            <div v-else class="flex items-center grow text-lg font-bold" @click="submenu = null">
              <Icon name="back" class="w-4 mr-2" />
              <span>{{ submenu }}</span>
            </div>
          </TransitionSlide>
          <div
            v-if="hasFilters"
            class="flex py-1 px-3 gap-2 border-2 border-dark items-center cursor-pointer rounded-3xl mr-3"
            @click="onResetAll"
          >
            <Icon class="w-4 h-4" name="rotate" />
            <div class="text-xs">{{ t('controls.filter.reset') }}</div>
          </div>
          <Icon name="close" class="w-4" @click="onCloseMenu" />
        </div>
        <TransitionSlide group mode="out-in" class="overflow-y-scroll pb-24">
          <div v-if="!submenu">
            <div
              v-for="(item, i) in components"
              :key="i"
              class="flex items-center px-6 py-4 border-b border-[#CDCDCD]"
              @click="submenu = item.label"
            >
              <span class="grow"
                >{{ item.label }}
                <span v-if="selected[item.key]" class="font-bold">({{ selected[item.key] }})</span>
              </span>
              <Icon name="arrow" class="w-3 -rotate-90" />
            </div>
            <div class="flex flex-col p-6 py-6 gap-6">
              <Boolean name="has_image" :label="t('controls.filter.hasImage')" :default="true" />
              <Boolean name="has_iip" :label="t('controls.filter.hasIip')" />
            </div>
          </div>
          <div v-else class="px-6">
            <component
              :is="selectedFilter.mobileComponent"
              v-if="selectedFilter"
              v-model="selected[selectedFilter.key]"
              :key-value="selectedFilter.key"
              :name="selectedFilter.key"
              :label="selectedFilter.label"
            />
          </div>
          <pre>{{ selected }}aa</pre>
        </TransitionSlide>
      </div>
      <div class="flex absolute inset-0 top-auto bg-white justify-center drop-shadow-2xl py-4 px-6">
        <button type="button" class="uppercase bg-dark text-white w-full py-3" @click="onCloseMenu">
          {{ t('controls.filter.submit') }} <span class="font-bold">({{ total }})</span>
        </button>
      </div>
    </div>
  </TransitionSlide>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

import Icon from '~/components/general/Icon.vue'
import { useControls } from '~/composables/controls'

const props = defineProps<{
  isOpened: boolean
  components: { label: string; component: string; mobileComponent: string; key: any }[]
}>()

const emit = defineEmits<{
  toggleMenu: [$event: MouseEvent]
  resetAll: []
}>()

const route = useRoute()
const { t } = useI18n()
const { width } = useWindowSize()
const submenu = ref<null | string>(null)
const { total, refresh, hasFilters } = await useControls()

const selectedFilter = computed(() => props.components.find((c) => c.label === submenu.value))

const selected = ref<Record<string, number>>({})

const loadFromRoute = () => {
  selected.value = {}
  Object.keys(route.query).forEach((key) => {
    selected.value[key] = String(route.query[key]).split('|').length
  })
}

onMounted(() => {
  loadFromRoute()
})

const onResetAll = () => {
  selected.value = {}
  emit('resetAll')
}

const onCloseMenu = ($event: MouseEvent) => {
  submenu.value = null
  emit('toggleMenu', $event)
}

watch(
  () => props.isOpened,
  (value) => {
    value && refresh()
  }
)

watch(
  () => props.isOpened,
  () => loadFromRoute()
)
</script>

<style scoped lang="scss"></style>
