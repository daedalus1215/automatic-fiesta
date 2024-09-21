<template>
  <q-editor
    :model-value="modelValue"
    @update:model-value="updateModelValue"
    min-height="5rem"
    :definitions="editorDefinitions"
    :toolbar="[
      [
        {
          label: $q.lang.editor.align,
          icon: $q.iconSet.editor.align,
          fixedLabel: true,
          list: 'only-icons',
          options: ['left', 'center', 'right', 'justify'],
        },
      ],
      ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
      ['token', 'hr', 'link', 'custom_btn'],
      ['print', 'fullscreen'],
      [
        {
          label: $q.lang.editor.formatting,
          icon: $q.iconSet.editor.formatting,
          list: 'no-icons',
          options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
        },
        {
          label: $q.lang.editor.fontSize,
          icon: $q.iconSet.editor.fontSize,
          fixedLabel: true,
          fixedIcon: true,
          list: 'no-icons',
          options: [
            'size-1',
            'size-2',
            'size-3',
            'size-4',
            'size-5',
            'size-6',
            'size-7',
          ],
        },
        {
          label: $q.lang.editor.defaultFont,
          icon: $q.iconSet.editor.font,
          fixedIcon: true,
          list: 'no-icons',
          options: [
            'default_font',
            'arial',
            'arial_black',
            'comic_sans',
            'courier_new',
            'impact',
            'lucida_grande',
            'times_new_roman',
            'verdana',
          ],
        },
        'removeFormat',
      ],
      ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
      ['undo', 'redo'],
      ['viewsource'],
    ]"
    :fonts="fonts"
  />
</template>

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
    },
  );

  const fonts = {
    arial: 'Arial',
    arial_black: 'Arial Black',
    comic_sans: 'Comic Sans MS',
    courier_new: 'Courier New',
    impact: 'Impact',
    lucida_grande: 'Lucida Grande',
    times_new_roman: 'Times New Roman',
    verdana: 'Verdana',
  };

  // Dynamically create definitions based on whether onSubmit is provided
  const editorDefinitions = {
    bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' },
    ...(props.onSubmit
      ? {
          save: {
            tip: 'Save your work',
            icon: 'save',
            label: 'Save',
            handler: () => {
              if (props.onSubmit) {
                props.onSubmit(props.modelValue); // Pass the current value on submit
              }
            },
          },
        }
      : {}),
  };
</script>

<style scoped>
  /* Add any styles specific to the editor component here */
</style>
