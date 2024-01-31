<template>
  <VMenu
    :triggers="['click']"
    :distance="6"
    placement="bottom-start"
    @show="isOpen = true"
    @hide="isOpen = false"
  >
    <div
      class="flex transition-all gap-3 py-3 px-4 bg-white serif border-2 cursor-pointer"
      :class="{ 'border-dark': isOpen, 'border-white': !isOpen }"
    >
      <div class="grow font-serif">
        {{ label }}
        <span v-if="model.length" class="font-sans font-bold">({{ model.length }})</span>
      </div>
      <div
        :class="{ 'rotate-180 text-primary': isOpen }"
        class="transition-all duration-300 ease-out flex"
      >
        <Icon name="arrow" class="w-3" />
      </div>
    </div>
    <template #popper>
      <div
        class="bg-white border-2 border-dark flex flex-col gap-3 p-6 serif overflow-y-scroll max-h-[430px] max-w-[340px]"
      >
        <Search v-model="searchString" />

        <div
          v-for="option in sortedOptions"
          :key="option.value"
          class="flex items-center gap-2 cursor-pointer"
          @click="onToggle(option.value)"
        >
          <div
            class="text-primary w-6 h-6 border-[1px] flex items-center transition-all"
            :class="{ 'bg-primary-light border-primary': model.includes(option.value) }"
          >
            <Icon v-if="model.includes(option.value)" class="text-primary w-8 h-8" name="check" />
          </div>
          <div>
            {{ option.label }} <span class="font-sans font-bold">({{ option.count }})</span>
          </div>
        </div>
      </div>
    </template>
  </VMenu>
</template>

<script setup lang="ts">
import levenshtein from 'levenshtein-array'

import { normalize } from '~/utils/string'
import Search from '~/components/controls/parts/Search.vue'
import Icon from '~/components/general/Icon.vue'

const props = defineProps<{
  label: string
  options: { label: string; value: string; count: string }[]
}>()

const model = defineModel<string[]>({
  default: [],
})

const searchString = ref('')
const isOpen = ref(false)

const sortedOptions = computed(() => {
  if (!searchString.value) {
    return props.options
  }

  const filtered = props.options.filter((l) =>
    normalize(l.label).includes(normalize(normalize(searchString.value)))
  )

  const sorted = levenshtein(
    filtered.map((l) => l.label),
    searchString.value
  ).sort((a, b) => a.l - b.l)

  return sorted.map((l, i) => ({
    label: filtered[i].label,
    value: filtered[i].value,
    count: filtered[i].count,
  }))
})

const onToggle = (value: string) => {
  if (model.value.includes(value)) {
    model.value = model.value.filter((v) => v !== value)
  } else {
    model.value = [...model.value, value]
  }
}
</script>
