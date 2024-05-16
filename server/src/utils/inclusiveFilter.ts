import { Task } from "src/types";
import { parseArrayString } from "./parseArrayString";

type inclusiveFilterType = (tasks: Task[], tagNames?: string[] | string) => Task[];

export const inclusiveFilter: inclusiveFilterType = (tasks, tagNames) => {
    if (tagNames && tagNames !== "null") {
        const tags = parseArrayString(tagNames);
        return tasks.filter(task => tags.some(tag => task.tags.includes(tag)));
    }
    return tasks;
};
