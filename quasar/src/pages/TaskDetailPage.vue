<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const task = ref({
  id: '',
  title: '',
  description: '',
  options: [],
})
const error = ref(null)

const fetchData = async (id) => {
  try {
    console.log('sss', id)
    const response = await axios.get(`http://localhost:3000/tasks/${id}`)
    console.log('response', task)
    console.log('responseTask', response.data)
    task.value = response.data
  } catch (err) {
    error.value = '1 Failed to load data.'
  } finally {
  }
}

onMounted(async () => {
  const id = route.params.id
  if (id) {
    await fetchData(id)
    // await fetchData2()
  } else {
    error.value = 'No task ID provided.'
    loading.value = false
  }
})

watch(
  () => route.params.id,
  async (newId) => {
    if (newId) {
      await fetchData(newId)
    }
  }
)
</script>

<template>
  <q-page style="padding-top: 60px" class="q-pa-md">
    <q-page-sticky position="top" expand class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat round dense icon="map" />
        <q-toolbar-title>{{ task.title }}</q-toolbar-title>
      </q-toolbar>
    </q-page-sticky>
    <p>{{ task.description }}</p>
  </q-page>

  <q-page-scroller position="bottom">
    <q-btn fab icon="keyboard_arrow_up" color="red" />
  </q-page-scroller>
</template>
