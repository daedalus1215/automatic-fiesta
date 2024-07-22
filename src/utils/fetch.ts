import axios from 'axios'
import config from '../config';
import { Tag, Task } from '../types'
import convertDateTimeToLocalTime from '../utils/convertDateTimeToLocalTime'


export const fetchTask = async (id: string): Promise<Task> => {
    const response = await axios.get(`${config.api}tasks/${id}`)
    return response.data
};

export const putTask = async (task: Task): Promise<Task> => {
    const { _id, description, contractId, tags, title } = task
    const dateFormatted = convertDateTimeToLocalTime(new Date())

    return await axios.put(`${config.api}tasks`, {
        taskId: _id,
        date: dateFormatted,
        time: 0,
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
