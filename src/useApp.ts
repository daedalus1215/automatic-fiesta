import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import writeJsonFile from '@utils/writeJsonFile';
import { fetchTasks, fetchTasksTitles } from '@utils/fetch';

export const useApp = () => {
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

  return {
    drawerLeft,
    tasks,
    query,
    forwardToTask,
    homeOnClick,
    downloadOnClick,
  };
};
