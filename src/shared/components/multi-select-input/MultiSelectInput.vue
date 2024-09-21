<script setup lang="ts">
  const props = defineProps({
    value: [String],
    options: [String],
  });
</script>

<template>
  <q-select
    filled
    :modelValue="value"
    @update:modeValue="$emit('update:value', $event.target.value)"
    multiple
    :options="options"
    style="width: 250px"
  />
</template>
