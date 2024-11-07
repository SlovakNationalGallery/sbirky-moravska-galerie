<template>
  <div
    v-if="attribute in labels"
    class="bg-primary text-white flex items-center py-1 px-3 gap-2 rounded-3xl text-xs"
  >
    <template v-if="['has_image', 'has_iip'].includes(attribute)">
      <span class="font-bold">{{ labels[attribute] }}</span>
    </template>
    <template v-else>
      <span class="font-bold">{{ labels[attribute] }}:</span>
      {{ serializedValue }}
    </template>
  </div>
</template>

<script setup lang="ts">
import { labels } from '~/utils/filter'
import { formatAuthor } from '~/utils/formatters'

const props = defineProps<{
  attribute: string
  value: string | string[]
}>()

const serializedValue = computed(() => {
  let values = props.value
  values = Array.isArray(values) ? values : [values]

  if (props.attribute === 'author') {
    values = values.map((author) => formatAuthor(author))
  }

  return values.join(', ')
})
</script>
