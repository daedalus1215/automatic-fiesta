<!-- src/components/HomePage.vue -->
<template>
    <div>
      <h1>Home Page</h1>
      <section class="topBar">
        Topbar
      </section>
      <section>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else>
          <div v-for="(task, index) in tasks" :key="task.id" class="task">
            <h3>{{ task.title }}</h3>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  // Reactive references for tasks, loading state, and error handling
  const tasks = ref([]);
  const loading = ref(true);
  const error = ref(null);
  
  // Function to fetch tasks from the remote URL
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks/tasks-titles');
      console.log('you came back!')
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      tasks.value = data;
    } catch (err) {
        console.log('shiiit')
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  
  // Call the fetch function when the component is mounted
  onMounted(() => {
    console.log('hi');
    fetchTasks();
  });
  
  /*
  Alternative with Axios:
  import axios from 'axios';
  
  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://api.example.com/tasks');
      tasks.value = response.data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  */
  </script>
  
  <style scoped>
  .task {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
  }
  </style>
  