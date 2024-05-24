import { Task } from "src/types";
import { parseArrayString } from "./parseArrayString";

type FilterType = (tasks: Task[], tagNames?: string[] | string) => Task[];

export const exclusiveFilter: FilterType = (tasks, tagNames = null) => {
    if (tagNames && tagNames !== "null") {
        const tags = parseArrayString(tagNames);
        return tasks.filter(task => {
            return !tags.some(tag => task.tags.includes(tag));
        });
    }

    return tasks;
};
