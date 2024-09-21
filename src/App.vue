
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import writeJsonFile from '@utils/writeJsonFile';
import { fetchTasks, fetchTasksTitles } from '@utils/fetch';
import SideBar from './shared/components/SideBar.vue';

const drawerLeft = ref(false);
const router = useRouter();
const tasks = ref([]);
const query = ref('');

// Navigation functions
const forwardToTask = (id: string) => {
  router.push({ name: 'Task', params: { id } });
};

const homeOnClick = () => router.push('/');
const downloadOnClick = async () => {
  const allTasks = await fetchTasks();
  writeJsonFile(allTasks);
};

// Fetch tasks on mount
onMounted(async () => {
  await fetchTasksAndUpdate();
});

// Watch for query changes
watch(query, async (value) => {
  console.log('Query value changed:', value);
  await fetchTasksAndUpdate(value);
});

// Fetch tasks based on query
const fetchTasksAndUpdate = async (searchQuery: string = '') => {
  try {
    const response = await fetchTasksTitles(searchQuery);
    tasks.value = response;
  } catch (err) {
    console.error('Failed to load data:', err);
  }
};
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
          <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />
          <q-toolbar-title>
            <q-btn square color="primary" icon="home" @click="homeOnClick" />
            <q-btn square color="secondary" icon="file_download" @click="downloadOnClick" />
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <SideBar
        v-model:query="query"
        v-model:drawerLeft="drawerLeft"
        :tasks="tasks"
        @forwardToTask="forwardToTask"
      />

      <q-page-container>
        <router-view></router-view>
      </q-page-container>
    </q-layout>
  </div>
</template>
