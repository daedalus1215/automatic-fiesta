<script setup>
import { ref, provide, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import SideBar from './components/SideBar.vue'

const drawerLeft = ref(false)
const router = useRouter()

const tasks = ref([])
const loading = ref(true)
const error = ref(null)

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

const forwardToTask = (id) => {
  console.log('forwardToTask', id)
  router.push({ name: 'Task', params: { id: id } })
}

// Call the fetch function when the component is mounted
onMounted(fetchTasks)
provide('drawerLeft', drawerLeft)
provide('forwardToTask', forwardToTask)
provide('tasks', tasks)
</script>

<template>
  <div class="q-pa-md">
    <q-layout
      view="lhh LpR lFf"
      container
      style="height: 500px"
      class="shadow-2 rounded-borders"
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
          <SideBar />
          <q-toolbar-title>Header</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <router-view></router-view>
      </q-page-container>

      <q-footer>
        <q-toolbar>
          <q-toolbar-title>Footer</q-toolbar-title>
        </q-toolbar>
      </q-footer>
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
