<template>
  <input
    :value="value"
    @input="$emit('update:value', $event.target.value)"
    class="fit no-outline no-border bg-primary text-white"
  />
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  value: String,
})
</script>
