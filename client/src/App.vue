<script setup lang="ts">
import { ref, provide, onMounted, watch } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import SideBar from './components/SideBar.vue'

const drawerLeft = ref(false)
const router = useRouter()

const tasks = ref([])
const loading = ref(true)
const error = ref('')
const query = ref('')

const fetchTasks = async (value: string) => {
  try {
    console.log('value', value)
    const response = await axios.get(getUrlToFetchTitles(value))
    return response.data
  } catch (err: { message: string }) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const getUrlToFetchTitles = (value: string) =>
  value
    ? `http://localhost:3000/tasks/tasks-titles?title=${value}`
    : 'http://localhost:3000/tasks/tasks-titles'

const forwardToTask = (id: string) => {
  console.log('forwardToTask', id)
  router.push({ name: 'Task', params: { id } })
}

// Call the fetch function when the component is mounted
onMounted(async () => {
  const response = await fetchTasks('')
  tasks.value = response
})

watch(
  () => query.value,
  async (value: string) => {
    console.log('dsadasd', value)
    try {
      const response = await await fetchTasks(value)
      console.log('response', response)
      tasks.value = response
    } catch (err) {
      error.value = '1 Failed to load data.'
    } finally {
    }
  }
)

provide('drawerLeft', drawerLeft)
provide('forwardToTask', forwardToTask)
provide('tasks', tasks)
</script>

<template>
  <div class="q-pa-md">
    <q-layout
      view="lhh LpR lFf"
      container
      style="height: 96vh"
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-header reveal :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
        <q-toolbar>
          <q-btn
            flat
            @click="drawerLeft = !drawerLeft"
            round
            dense
            icon="menu"
          />
          <SideBar v-model:query="query" />
          <q-toolbar-title>Header</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <router-view> </router-view>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
