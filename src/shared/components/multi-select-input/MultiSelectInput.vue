<script setup lang="ts">
  const props = defineProps({
    value: [String],
    options: [String],
    icon: String,
    label: String
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
    :label="props.label"
    >
    <template v-slot:prepend>
        <q-icon :name="props.icon" />
        </template>
    </q-select> 
</template>
