import { ref, onMounted, watch,computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import convertDateTimeToLocalTime from '../../utils/convertDateTimeToLocalTime'
import config from '../../config';
import { useQuery } from '@tanstack/vue-query';

export const useTaskForm = () => {
  const route = useRoute()
  const task = ref({
    title: '',
    description: '',
    options: [],
    _id:'', 
    contractId:'', 
    tags: []
  })

  const fetchTask = async (id: string) => {
    const response = await axios.get(`${config.api}tasks/${id}`)
    return response.data
  }

  const taskId = computed(() => route.params.id as string)

  const { data, isError, isLoading, isPending } = useQuery({
    queryKey:['task', taskId],
    queryFn: () => fetchTask(taskId.value)
})


//   const submitForm = async () => {
//     console.log('Form submitted:', task.value)
//     const { _id, description, contractId, tags, title } = task.value
//     const dateFormatted = convertDateTimeToLocalTime(new Date())

//     return await axios.put(`${config.api}tasks`, {
//       taskId: _id,
//       date: dateFormatted,
//       time: 0,
//       contractId,
//       description,
//       tags,
//       title,
//     })
//   }

  return {
    isError,
     isLoading, 
     isPending,
    // submitForm,
    data,
  }
}
