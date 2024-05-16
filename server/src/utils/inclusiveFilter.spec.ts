import { Task } from "src/types";
import { inclusiveFilter } from "./inclusiveFilter";

describe('server/src/utils/__tests__/inclusiveFilter.spec.ts', () => {
    describe('inclusiveFilter', () => {
        it('should return back expected if tagNames equals "null"', () => {
            // Arrange
            const expected: Task[] = [{
                id: "",
                tags: [],
                description: "",
                date: "",
                title: "",
                time: []
            }];

            // Act
            const actual = inclusiveFilter(expected, "null");

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should return back expected if tagNames equals null', () => {
            // Arrange
            const expected: Task[] = [{
                id: "",
                tags: [],
                description: "",
                date: "",
                title: "",
                time: []
            }];

            // Act
            const actual = inclusiveFilter(expected);

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should return tasks that do contain value in tagNames', () => {
            // Arrange
            const expected = [{
                id: "1",
                tags: ["name1"],
                description: "das",
                date: "05/12/2024",
                title: "1",
                time: []
            }, {
                id: "3",
                tags: ["name1", "name2"],
                description: "das",
                date: "05/12/2024",
                title: "1",
                time: []
            }];

            const tasks: Task[] = [
                ...expected,
                {
                    id: "2",
                    tags: ["name2"],
                    description: "dsa",
                    date: "05/12/2024",
                    title: "2",
                    time: []
                }
            ];

            const tagNames = "name1"

            // Act
            const actual = inclusiveFilter(tasks, tagNames);

            // Assert
            expect(actual).toEqual(expected);
        });
    });
})