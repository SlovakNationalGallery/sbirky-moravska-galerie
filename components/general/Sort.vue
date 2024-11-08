<template>
  <div class="border-b-2 border-black">
    <Dropdown v-model="model" :options="sortOptions" @update:model-value="onUpdate">
      <template #label="{ label }">{{ t('item.sortBy') }} {{ label }}</template>
    </Dropdown>
  </div>
</template>
<script lang="ts" setup>
import Dropdown from '~/components/general/Dropdown.vue'
import { useControls } from '~/composables/controls'

const props = defineProps<{
  sortBy: string
  sortDirection: 'asc' | 'desc'
}>()

const emit = defineEmits<{
  sortBy: string
  sortDirection: 'asc' | 'desc'
}>()

const { routeParams } = await useControls()
const { t } = useI18n()

const sortOptions = [
  { label: t('item.sortOptions.updatedAt'), value: 'updated_at', direction: 'desc' },
  { label: t('item.sortOptions.createdAt'), value: 'created_at', direction: 'asc' },
  { label: t('item.sortOptions.title'), value: 'title', direction: 'asc' },
  { label: t('item.sortOptions.dateEarliest'), value: 'date_earliest', direction: 'asc' },
  { label: t('item.sortOptions.viewCount'), value: 'view_count', direction: 'desc' },
  { label: t('item.sortOptions.random'), value: 'random', direction: 'asc' },
] as const

const model = ref<(typeof sortOptions)[number]['value']>(sortOptions[0].value)

onMounted(() => {
  if (props.sortBy !== sortOptions[0].value) {
    routeParams.sortBy = props.sortBy
  }

  if (props.sortDirection !== sortOptions[0].direction) {
    routeParams.sortDirection = props.sortDirection
  }

  model.value =
    sortOptions.find((option) => option.value === props.sortBy)?.value ?? sortOptions[0].value
})

const onUpdate = (value: string) => {
  const option = sortOptions.find((option) => option.value === value)

  if (option) {
    emit('update:sortBy', option.value)
    emit('update:sortDirection', option.direction)

    option.value === sortOptions[0].value
      ? delete routeParams.sortBy
      : (routeParams.sortBy = option.value)

    option.direction === sortOptions[0].direction
      ? delete routeParams.sortDirection
      : (routeParams.sortDirection = option.direction)
  }
}
</script>
