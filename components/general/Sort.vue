<template>
  <div class="border-b-2 border-black">
    <Dropdown v-model="model" :options="sortOptions" @update:model-value="onUpdate">
      <template #label="{ label }">podle {{ label }}</template>
    </Dropdown>
  </div>
</template>
<script lang="ts" setup>
import Dropdown from '~/components/general/Dropdown.vue'

const { sortBy, sortDirection } = defineProps<{
  sortBy: string
  sortDirection: 'asc' | 'desc'
}>()

const emit = defineEmits<{
  [update: sortBy]: string
  [update: sortDirection]: 'asc' | 'desc'
}>()

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
    emit('update:sortBy', option.value)
    emit('update:sortDirection', option.direction)
  }
}
</script>
