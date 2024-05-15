import { parseArrayString } from "./parseArrayString";

export const exclusiveFilter = (tasks, tagNames) => {
    if (tagNames && tagNames !== "null") {
        const tags = parseArrayString(tagNames);
        return tasks.filter(task => {
            return !tags.some(tag => task.tags.includes(tag));
        });
    }

    return tasks;
};
