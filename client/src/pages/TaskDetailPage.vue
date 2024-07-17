<script setup>
import { ref, onMounted, watch, inject } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import convertDateTimeToLocalTime from '../utils/convertDateTimeToLocalTime'

const route = useRoute()
const task = ref({
  id: '',
  title: '',
  description: '',
  options: [],
})

const error = ref(null)
const formSubmit = inject('formSubmit')

const fetchTask = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/tasks/${id}`)
    task.value = response.data
  } catch (err) {
    error.value = '1 Failed to load data.'
  } finally {
  }
}

/**
 * Handle initial page load
 */
onMounted(async () => {
  const id = route.params.id
  if (id) {
    await fetchTask(id)
    // await fetchData2()
  } else {
    error.value = 'No task ID provided.'
    loading.value = false
  }
})

/**
 * If we are already on the page and user clicks on a different task, we want to make sure we re-fetch with the new id.
 */
watch(
  () => route.params.id,
  async (newId) => {
    if (newId) {
      await fetchTask(newId)
    }
  }
)

const submitForm = async (e) => {
  console.log('Form submitted:', task._value)
  console.log('e', e)
  const { _id, description, contractId, tags, title } = task._value
  const dateFormatted = convertDateTimeToLocalTime(new Date())

  return await axios.put('http://localhost:3000/tasks', {
    taskId: _id,
    date: dateFormatted,
    time: 0,
    contractId,
    description,
    tags,
    title,
  })
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <q-page style="padding-top: 60px" class="q-pa-md">
      <q-page-sticky position="top" expand class="bg-primary text-white">
        <q-toolbar>
          <q-btn flat round dense icon="map" />
          <q-toolbar-title>
            <input
              v-model="task.title"
              class="fit no-outline no-border bg-primary text-white"
          /></q-toolbar-title>
        </q-toolbar>
      </q-page-sticky>

      <q-editor v-model="task.description" min-height="5rem" />
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
