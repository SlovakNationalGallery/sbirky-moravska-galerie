<template>
  <div class="border-b-2 border-black">
    <Dropdown v-model="model" :options="sortOptions" @update:model-value="onUpdate">
      <template #label="{ label }">podle {{ label }}</template>
    </Dropdown>
  </div>
</template>
<script lang="ts" setup>
import Dropdown from '~/components/general/Dropdown.vue'

const sortBy = defineModel<string | null>('sortBy')
const sortDirection = defineModel<string | null>('sortDirection')

const sortOptions = [
  { label: 'relevance', value: null, direction: null },
  { label: 'data přidání', value: 'created_at', direction: 'asc' },
  { label: 'názvu', value: 'title', direction: 'asc' },
  { label: 'datování - nejstarší', value: 'date_earliest', direction: 'asc' },
  { label: 'datování - najnovejši', value: 'date_earliest', direction: 'desc' },
  { label: 'počtu zobrazení', value: 'view_count', direction: 'desc' },
  { label: 'náhodně', value: 'random', direction: 'asc' },
  { label: 'poslední změny', value: 'updated_at', direction: 'desc' },
] as const

const model = ref(sortOptions.find((option) => option.value === sortBy.value) || null)

const onUpdate = (value: string) => {
  const option = sortOptions.find((option) => option.value === value)

  if (option) {
    sortBy.value = option.value
    sortDirection.value = option.direction
  }
}
</script>
