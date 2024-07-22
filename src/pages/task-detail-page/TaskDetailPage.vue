<script setup lang="ts">
import { useTaskForm } from "./useTaskForm";
import PrimaryInput from "@components/primary-input/PrimaryInput.vue";
import MultiSelectInput from "@components/multi-select-input/MultiSelectInput.vue";
const { isError, isLoading, isPending, onSubmit, formData, options } = useTaskForm();
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
            <q-toolbar-title>
              <PrimaryInput v-model:value="formData.title" />
            </q-toolbar-title>
          </q-toolbar>
        </q-page-sticky>
        <MultiSelectInput v-model="formData.tags" :options="options"/>
        <q-editor v-model="formData.description" min-height="5rem" />
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