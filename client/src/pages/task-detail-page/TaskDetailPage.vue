<template>
  <v-container>
    <h1>Task Page</h1>
    <v-divider></v-divider>
    <section class="topBar">Topbar</section>
    <v-divider></v-divider>
    <section>
      <v-row v-if="loading">
        <v-col>
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-col>
      </v-row>
      <v-row v-else-if="error">
        <v-col>
          <v-alert dense outlined color="error">{{ error }}</v-alert>
        </v-col>
      </v-row>
      <v-form v-else>
        <v-text-field v-model="task.title" label="Title"></v-text-field>
        <v-select
          v-model="task.tags[0]"
          :items="tags"
          selected
          label="Options"
          multiple
        ></v-select>
        <v-textarea v-model="task.description" label="Description"></v-textarea>
      </v-form>
    </section>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const loading = ref(true)
const error = ref(null)
const task = ref({
  id: '',
  title: '',
  description: '',
  options: [],
})

const tags = ref(null)

const fetchData = async (id) => {
  try {
    console.log('sss', task)
    const response = await axios.get(`http://localhost:3000/tasks/${id}`)
    console.log('sss', task)
    console.log('responseTask', response.data)
    task.value = response.data
  } catch (err) {
    error.value = '1 Failed to load data.'
  } finally {
  }
}

const fetchData2 = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/tags`)
    const tagNames = (await response.data).map((tag) => tag.name)
    console.log('tagNames', tagNames)
    tags.value = tagNames
  } catch (err) {
    error.value = '2 Failed to load data.'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  const id = route.params.id
  if (id) {
    await fetchData(id)
    await fetchData2()
  } else {
    error.value = 'No task ID provided.'
    loading.value = false
  }
})
</script>
