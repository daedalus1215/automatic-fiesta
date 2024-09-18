<script setup lang="ts">
import { useTaskForm } from "./useTaskForm";
import PrimaryInput from "@components/primary-input/PrimaryInput.vue";
import MultiSelectInput from "@components/multi-select-input/MultiSelectInput.vue";
import { onMounted, onUnmounted, ref } from "vue";
const { isError, isLoading, isPending, onSubmit, formData, options } = useTaskForm();
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth < 600; // Adjust the breakpoint as needed
  console.log('isMobile', isMobile.value)
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>

<template>
  <div v-if="isLoading">
    <div v-if="isPending" class="update">Loading...</div>
  </div>
  <div v-else>
    <q-form @submit.prevent="onSubmit" class="q-pa-md">
      <q-page style="padding-top: 60px" class="q-pa-md">
        <q-page-sticky position="top" expand class="bg-primary text-white">
          <q-toolbar>
            <q-btn flat round dense icon="map" />
            <q-toolbar-title v-if="$q.screen.gt.sm"> <!-- Show only on larger screens -->
              <PrimaryInput v-model:value="formData.title" />
            </q-toolbar-title>
          </q-toolbar>
        </q-page-sticky>
        <MultiSelectInput v-model="formData.tags" :options="options" />
        <q-editor v-if="!isMobile" v-model="formData.description" min-height="5rem" :definitions="{
          bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' },
          save: {
            tip: 'Save your work',
            icon: 'save',
            label: 'Save',
            handler: onSubmit
          }
        }" :toolbar="[
          [
            {
              label: $q.lang.editor.align,
              icon: $q.iconSet.editor.align,
              fixedLabel: true,
              list: 'only-icons',
              options: ['left', 'center', 'right', 'justify']
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
              options: [
                'p',
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'code'
              ]
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
                'size-7'
              ]
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
                'verdana'
              ]
            },
            'removeFormat'
          ],
          ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

          ['undo', 'redo'],
          ['viewsource']
        ]" :fonts="{
          arial: 'Arial',
          arial_black: 'Arial Black',
          comic_sans: 'Comic Sans MS',
          courier_new: 'Courier New',
          impact: 'Impact',
          lucida_grande: 'Lucida Grande',
          times_new_roman: 'Times New Roman',
          verdana: 'Verdana'
        }" />
      </q-page>

      <q-page-scroller position="bottom">
        <q-btn fab icon="keyboard_arrow_up" color="red" />
      </q-page-scroller>
      <q-footer>
        <q-toolbar>
          <q-btn :loading="isLoading" type="submit">Submit</q-btn>
        </q-toolbar>
      </q-footer>
    </q-form>
  </div>
</template>


<style scoped>
@media (max-width: 600px) {
  .q-toolbar {
    height: 48px;
    /* Adjust height for mobile */
  }

  .q-toolbar-title {
    font-size: 1rem;
    /* Adjust font size */
  }
}
</style>
