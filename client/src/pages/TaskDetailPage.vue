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
      <v-list :width="500" lines v-else>
        <v-list-item
          class="task"
          link
          v-for="(task, index) in tasks"
          :key="task.id"
          @click="click"
          outlined
        >
          {{ task.title }}
        </v-list-item>
      </v-list>
    </section>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const tasks = ref([])
const loading = ref(true)
const error = ref(null)

// Function to fetch tasks from the remote URL
const fetchTasks = async () => {
  try {
    const response = await axios.get('http://localhost:3000/tasks/tasks-titles')
    tasks.value = response.data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const click = (e) => {
  console.log('e', e)
}

// Call the fetch function when the component is mounted
onMounted(fetchTasks)
</script>

<style scoped>
.task {
  margin-bottom: 20px;
}
</style>
