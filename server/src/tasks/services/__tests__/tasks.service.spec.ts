import { Model } from "mongoose";
import { TasksService } from "../tasks.service";
import { TaskDocument } from "src/tasks/schema/task/task.schema";
import { Task } from "src/types";
import { StringUtil } from "../../../utils/string-util";
import { FilterUtil } from "../../../utils/filter-util";
import { DateUtil } from "../../../utils/date-util";

describe('server/src/tasks/services/__tests__/tasks.service.spec.ts', () => {
    describe('taskService', () => {
        let target: TasksService;
        let modelMock: Model<TaskDocument>;

        beforeEach(async () => {
            modelMock = Model<TaskDocument> = jest.fn() as unknown as Model<TaskDocument>;
            const stringUtil = new StringUtil();
            target = new TasksService(modelMock, stringUtil, new FilterUtil(stringUtil), new DateUtil());
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
            it('should call find single task by id, when id is present', async () => {
                // Arrange
                const expected: Task = {
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
                expect(modelMock.findById).toHaveBeenNthCalledWith(1, id);
                expect(actual).toEqual(expected)
            });

            //@TODO: Left off here
        });
        it('should throw new Error, when id is missing', async () => {
            // Arrange
            modelMock.findById = jest.fn();

            // Act & Assert
            await expect(target.findOne()).rejects.toThrow('Need id');
            expect(modelMock.findById).not.toHaveBeenCalled();
        });


        //@TODO: Left off here

    });
});