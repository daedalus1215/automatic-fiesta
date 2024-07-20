<script setup lang="ts">
import {useTaskForm} from './useTaskForm'
import PrimaryInput from '../../components/primary-input/PrimaryInput.vue'
const {isError, isLoading, isPending, data} = useTaskForm()
</script>

<template>
  <template v-if="isLoading">
    <div v-if="isPending" class="update">Loading...</div>
  </template>
 <template v-else>
  <form @submit.prevent="submitForm">
    <q-page style="padding-top: 60px" class="q-pa-md">
      <q-page-sticky position="top" expand class="bg-primary text-white">
        <q-toolbar>
          <q-btn flat round dense icon="map" />
          <q-toolbar-title>
          <PrimaryInput v-model:value="data.title" />
        </q-toolbar-title>
        </q-toolbar>
      </q-page-sticky>

      <q-editor v-model="data.description" min-height="5rem" />
    </q-page>

    <q-page-scroller position="bottom">
      <q-btn fab icon="keyboard_arrow_up" color="red" />
    </q-page-scroller>
    <q-footer>
      <q-toolbar>
        <q-btn type="submit">Submit</q-btn>
      </q-toolbar>
    </q-footer>
  </form>
 </template>
</template>