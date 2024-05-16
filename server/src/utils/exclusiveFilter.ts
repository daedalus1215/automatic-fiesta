import { Task } from "src/types";
import { parseArrayString } from "./parseArrayString";

type inclusiveFilterType = (tasks: Task[], tagNames?: string[] | string) => Task[];

export const exclusiveFilter = (tasks, tagNames = null) => {
    if (tagNames && tagNames !== "null") {
        const tags = parseArrayString(tagNames);
        return tasks.filter(task => {
            return !tags.some(tag => task.tags.includes(tag));
        });
    }

    return tasks;
};
