import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import convertDateTimeToLocalTime from '../../utils/convertDateTimeToLocalTime'
import config from '../../config';

export const useTaskForm = () => {
  const route = useRoute()
  const task = ref({
    id: '',
    title: '',
    description: '',
    options: [],
  })

  const error = ref('')
  const loading = ref(false)

  const fetchTask = async (id: string) => {
    try {
      const response = await axios.get(`${config.api}tasks/${id}`)
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
    const id = route.params.id as string
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
    () => route.params.id as string,
    async (value) => {
      if (value) {
        await fetchTask(value)
      }
    }
  )

  const submitForm = async () => {
    console.log('Form submitted:', task._value)
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

  return {
    error,
    loading,
    submitForm,
    task,
  }
}
