<script setup lang="ts">
  import { ref, provide, onMounted, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import SideBar from '@components/SideBar.vue';
  import writeJsonFile from '@utils/writeJsonFile';
  import { fetchTasks, fetchTasksTitles } from '@utils/fetch';

  const drawerLeft = ref(false);
  const router = useRouter();

  const tasks = ref([]);
  const loading = ref(true);
  const error = ref('');
  const query = ref('');

  const forwardToTask = (id: string) => {
    router.push({ name: 'Task', params: { id } });
  };

  const homeOnClick = () => router.push('/');
  const downloadOnClick = async () => {
    const allTasks = await fetchTasks();
    writeJsonFile(allTasks);
  };
  const fileuploadOnClick = async () => {};

  // Call the fetch function when the component is mounted
  onMounted(async () => {
    const response = await fetchTasksTitles('');
    tasks.value = response;
  });

  watch(
    () => query.value,
    async (value: string) => {
      console.log('dsadasd', value);
      try {
        const response = await fetchTasksTitles(value);
        console.log('response', response);
        tasks.value = response;
      } catch (err) {
        error.value = '1 Failed to load data.';
      } finally {
      }
    },
  );

  provide('drawerLeft', drawerLeft);
  provide('forwardToTask', forwardToTask);
  provide('tasks', tasks);
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
          <q-toolbar-title>
            <q-btn square color="primary" icon="home" @click="homeOnClick" />
            <q-btn
              square
              color="secondary"
              icon="file_download"
              @click="downloadOnClick"
            />
            <q-btn
              square
              color="amber"
              glossy
              text-color="black"
              icon="file_upload"
              @click="fileuploadOnClick"
            />
            <q-btn square color="brown-5" icon="bar_charts" />
            <q-btn square color="deep-orange" icon="tag" />
            <q-btn square color="black" icon="add" />
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <router-view></router-view>
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
