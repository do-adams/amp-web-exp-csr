<template>
  <div class="flex items-center space-x-2">
    <label for="language-select" class="text-sm font-medium">Language:</label>
    <select
      id="language-select"
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      class="form-select rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { Language } from '@/types'
import type { PropType } from 'vue'

defineProps({
  modelValue: {
    type: String as PropType<Language>,
    required: true,
  },
})

defineEmits(['update:modelValue'])

const options = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
]
</script>

<style scoped></style>
