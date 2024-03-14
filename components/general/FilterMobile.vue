<template>
  <div
    v-show="width < 768"
    class="flex py-2 w-full justify-center items-center gap-3 text-dark border border-dark"
    @click="onCloseMenu"
  >
    <Icon class="w-5 h-5" name="filter" />
    <span class="uppercase">Celý filter</span>
  </div>

  <TransitionSlide>
    <div v-if="isOpened" class="fixed inset-0 top-10 flex flex-col bg-white z-50">
      <div class="flex flex-col h-full">
        <div class="flex p-6">
          <TransitionSlide group mode="out-in" class="grow">
            <div v-if="!submenu" class="text-lg font-bold">Filter diel</div>
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
            <div class="text-xs">Zrušiť výber</div>
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
              <Boolean key-value="has_image" label="Len s obrázkom" :default="true" />
              <Boolean key-value="has_iip" label="Len so zoomom" />
            </div>
          </div>
          <div v-else class="px-6">
            <component
              :is="selectedFilter.mobileComponent"
              v-if="selectedFilter"
              :key="selectedFilter.key"
              v-model="selected[selectedFilter.key]"
              :key-value="selectedFilter.key"
              :label="selectedFilter.label"
            />
          </div>
        </TransitionSlide>
      </div>
      <div class="flex absolute inset-0 top-auto bg-white justify-center drop-shadow-2xl py-4 px-6">
        <button type="button" class="uppercase bg-dark text-white w-full py-3" @click="onCloseMenu">
          zobraziť výsledky <span class="font-bold">({{ total }})</span>
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

const { width } = useWindowSize()
const submenu = ref<null | string>(null)
const { total, refresh, hasFilters } = await useControls()

const selectedFilter = computed(() => props.components.find((c) => c.label === submenu.value))

const selected = ref<Record<string, number>>({})

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
</script>

<style scoped lang="scss">

</style>