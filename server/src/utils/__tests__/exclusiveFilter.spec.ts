import { Task } from "src/types";
import { exclusiveFilter } from "../exclusiveFilter";

describe('server/src/utils/__tests__/exclusiveFilter.spec.ts', () => {
    describe('exclusiveFilter', () => {
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
            const actual = exclusiveFilter(expected, "null");

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
            const actual = exclusiveFilter(expected);

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should return tasks that do not contain value in tagNames', () => {
            // Arrange
            const expected = [{
                id: "1",
                tags: ["name2", "name4"],
                description: "das",
                date: "05/12/2024",
                title: "1",
                time: []
            }];

            const tasks: Task[] = [
                ...expected,
                {
                    id: "2",
                    tags: ["name1"],
                    description: "dsa",
                    date: "05/12/2024",
                    title: "2",
                    time: []
                }
            ];

            const tagNames = "name1"

            // Act
            const actual = exclusiveFilter(tasks, tagNames);

            // Assert
            expect(actual).toEqual(expected);
        });
    });
})