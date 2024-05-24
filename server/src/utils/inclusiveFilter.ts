import { Task } from "src/types";
import { parseArrayString } from "./parseArrayString";

type FilterType = (tasks: Task[], tagNames?: string[] | string) => Task[];

export const inclusiveFilter: FilterType = (tasks, tagNames) => {
    if (tagNames && tagNames !== "null") {
        const tags = parseArrayString(tagNames);
        return tasks.filter(task => tags.some(tag => task.tags.includes(tag)));
    }
    return tasks;
};
