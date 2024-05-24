import { Model } from "mongoose";
import { TasksService } from "../tasks.service";
import { TaskDocument } from "src/tasks/schema/task/task.schema";
import { Task } from "src/types";

describe('server/src/tasks/services/__tests__/tasks.service.spec.ts', () => {
    describe('taskService', () => {
        let target: TasksService;
        let modelMock: Model<TaskDocument>;

        beforeEach(() => {
            modelMock = Model<TaskDocument> = jest.fn() as unknown as Model<TaskDocument>;
            target = new TasksService(modelMock);
        });

        describe('#findAll', () => {
            it('should', () => {
                // Arrange
                modelMock.find = jest.fn();

                // Act
                target.findAll();

                // Assert
                expect(modelMock.find).toHaveBeenCalledTimes(1);
            });
        });

        describe('#findOne', () => {
            it('should', async () => {
                // Arrange
                const expected:Task = {
                    id: "",
                    tags: [],
                    description: "",
                    date: "",
                    title: "",
                    time: []
                }
                const id = 'randomId';
                modelMock.findById = jest.fn().mockImplementationOnce(() => expected);

                // Act
                const actual = await target.findOne(id);

                // Assert
                expect(modelMock.findOne).toHaveBeenNthCalledWith(1, id);
                expect(actual).toEqual(expected)
            });

            //@TODO: Left off here
        });
    });
});