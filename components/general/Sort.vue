<template>
  <div class="border-b-2 border-black">
    <Dropdown v-model="model" :options="sortOptions" @update:model-value="onUpdate">
      <template #label="{ label }">podle {{ label }}</template>
    </Dropdown>
  </div>
</template>
<script lang="ts" setup>
import Dropdown from '~/components/general/Dropdown.vue'

const sortBy = defineModel<string>('sortBy')
const sortDirection = defineModel<string>('sortDirection')

const sortOptions = [
  { label: 'poslední změny', value: 'updated_at', direction: 'desc' },
  { label: 'data přidání', value: 'created_at', direction: 'asc' },
  { label: 'názvu', value: 'title', direction: 'asc' },
  { label: 'datování', value: 'date_earliest', direction: 'asc' },
  { label: 'počtu zobrazení', value: 'view_count', direction: 'desc' },
  { label: 'náhodně', value: 'random', direction: 'asc' },
] as const

const model = ref(sortOptions[0].value)

const onUpdate = (value: string) => {
  const option = sortOptions.find((option) => option.value === value)

  if (option) {
    sortBy.value = option.value
    sortDirection.value = option.direction
  }
}
</script>
