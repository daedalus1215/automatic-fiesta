import axios from 'axios'
import { Tag, Task } from '../constants'
import convertDateTimeToLocalTime from '../utils/convertDateTimeToLocalTime'
import config from '../../config'

export const fetchTasks = async () => {
    const response = await axios.get(`${config.api}tasks`)
    return response.data
}

export const fetchTasksTitles = async (value: string) => {
    const response = await axios.get(getUrlToFetchTitles(value))
    return response.data
}

const getUrlToFetchTitles = (value: string) => value
    ? `${config.api}tasks/tasks-titles?title=${value}`
    : `${config.api}tasks/tasks-titles`

export const fetchTask = async (id: string): Promise<Task> => {
    const response = await axios.get(`${config.api}tasks/${id}`)
    return response.data
};

export const putTask = async (task: Task): Promise<Task> => {
    const { _id, description, contractId, tags, title, time } = task
    const dateFormatted = convertDateTimeToLocalTime(new Date())

    return await axios.put(`${config.api}tasks`, {
        taskId: _id,
        date: dateFormatted,
        time,
        contractId,
        description,
        tags,
        title,
    })
}

//@TODO: We should not return description too.
export const fetchTags = async (): Promise<Tag[]> => {
    const response = await axios.get(`${config.api}tags`)
    return response.data
};

export const fetchYearlyActivities = async () => {
    const response = await axios.get(`${config.api}activities/all`)
    return response.data
}