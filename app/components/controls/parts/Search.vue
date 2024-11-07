<template>
  <div class="flex bg-white border border-dark px-3 py-2">
    <Icon v-if="prependIcon" name="search" class="w-5 mr-2" />
    <input
      v-bind="attrs"
      v-model="model"
      placeholder="Napište klíčové slova"
      class="w-full border-transparent !outline-none"
    />
    <Icon v-if="!prependIcon" name="search" class="w-5" />
  </div>
</template>

<script setup lang="ts">
import Icon from '~/components/general/Icon.vue'

withDefaults(
  defineProps<{
    prependIcon?: boolean
  }>(),
  {
    prependIcon: false,
  }
)

const model = defineModel<string>({
  default: '',
})

const attrs = useAttrs()
</script>
