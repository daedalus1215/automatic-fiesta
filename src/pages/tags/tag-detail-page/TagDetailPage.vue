<script setup lang="ts">
  import { useTagForm } from './useTagForm';
  import PrimaryInput from '@components/primary-input/PrimaryInput.vue';
  import Editor from '@components/editor/Editor.vue';
  import MiniEditor from '@components/mini-editor/MiniEditor.vue';
  import { useCheckMobile } from '@shared/hooks/useCheckMobile';
  const { isError, isLoading, isPending, onSubmit, formData, options } =
    useTagForm();
  const isMobile = useCheckMobile();
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
            <q-btn flat round dense icon="save" type="submit" />
            <q-toolbar-title>
              <PrimaryInput v-model:value="formData.title" />
            </q-toolbar-title>
          </q-toolbar>
        </q-page-sticky>
        <MiniEditor
          v-if="isMobile"
          v-model="formData.description"
          :onSubmit="onSubmit"
        />
        <Editor v-else v-model="formData.description" :onSubmit="onSubmit" />
      </q-page>

      <q-page-scroller position="bottom">
        <q-btn fab icon="keyboard_arrow_up" color="red" />
      </q-page-scroller>

      <q-page-scroller reverse position="top" :scroll-offset="20" :offset="[0, 18]">
            <q-btn fab icon="keyboard_arrow_down" color="accent" />
          </q-page-scroller>
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
