<script setup lang="ts">
  const props = defineProps({
    value: String,
  });
</script>

<template>
  <input
    :value="value"
    @input="$emit('update:value', $event.target.value)"
    class="fit no-outline no-border bg-primary text-white"
  />
</template>
