<script setup lang="ts">
import { defineProps, watch } from 'vue';

const props = defineProps<{
    modelValue: string;
    onSubmit?: (value: string) => void; // Specify the type for onSubmit
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

// Update the modelValue and emit the change
const updateModelValue = (value: string) => {
    emit('update:modelValue', value);
};

// Watch for changes to the modelValue and emit updates
watch(
    () => props.modelValue,
    (newValue) => {
        emit('update:modelValue', newValue);
    }
);

const fonts = {
    arial: 'Arial',
    arial_black: 'Arial Black',
    comic_sans: 'Comic Sans MS',
    courier_new: 'Courier New',
    impact: 'Impact',
    lucida_grande: 'Lucida Grande',
    times_new_roman: 'Times New Roman',
    verdana: 'Verdana'
};

// Dynamically create definitions based on whether onSubmit is provided
const editorDefinitions = {
    bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' },
    ...(props.onSubmit ? {
        save: {
            tip: 'Save your work',
            icon: 'save',
            label: 'Save',
            handler: () => {
                if (props.onSubmit) {
                    props.onSubmit(props.modelValue); // Pass the current value on submit
                }
            }
        }
    } : {})
};
</script>


<template>
    <q-editor :model-value="modelValue" @update:model-value="updateModelValue" min-height="5rem" />
</template>