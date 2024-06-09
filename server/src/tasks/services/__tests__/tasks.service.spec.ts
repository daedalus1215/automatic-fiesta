import { Model } from "mongoose";
import { TasksService } from "../tasks.service";
import { TaskDocument } from "src/tasks/schema/task/task.schema";
import { Task } from "src/types";
import { StringUtil } from "../../../utils/string-util";
import { FilterUtil } from "../../../utils/filter-util";
import { DateUtil } from "../../../utils/date-util";
import { UpdateTaskDto } from "src/tasks/dtos/update-task/update-task.dto";
import { RandomUtils } from "../../../utils/random-utils";

describe('server/src/tasks/services/__tests__/tasks.service.spec.ts', () => {
    describe('taskService', () => {
        let randomUtils;
        let target: TasksService;
        let modelMock: Model<TaskDocument>;

        beforeEach(async () => {
            modelMock = Model<TaskDocument> = jest.fn() as unknown as Model<TaskDocument>;
            const stringUtil = new StringUtil();
            target = new TasksService(modelMock, stringUtil, new FilterUtil(stringUtil), new DateUtil());
            randomUtils = new RandomUtils();
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

            it('should throw new Error, when id is missing', async () => {
                // Arrange
                modelMock.findById = jest.fn();

                // Act & Assert
                await expect(target.findOne()).rejects.toThrow('Need id');
                expect(modelMock.findById).not.toHaveBeenCalled();
            });
        });

        describe('#update', () => {
            it('should updateTask with dto when dto is present', async () => {
                // Arrange
                const dto: UpdateTaskDto = {
                    date: randomUtils.randomString(),
                    dateTimes: [{
                        date: randomUtils.randomString(),
                        _id: randomUtils.randomString(),
                        time: randomUtils.randomString()
                    }],
                    description: randomUtils.randomString(),
                    tags: [],
                    taskId: randomUtils.randomString(),
                    time: randomUtils.randomNumber(),
                    title: randomUtils.randomString()
                };
                modelMock.updateOne = jest.fn().mockImplementationOnce(() => dto);


                // Act
                const actual = await target.update(dto);

                // Assert
                expect(actual).toEqual(dto);
            });

            it('should throw error, when dto is missing', async () => {
                // Arrange & Act & Assert
                await expect(target.update()).rejects.toThrow('dto');
            });
        });

        describe('#updateDateTimeOfTask', () => {
            it('should...', () => {
                // Arrange
                const expected: Task = {
                    id: randomUtils.randomString(),
                    tags: [randomUtils.randomString()],
                    description: randomUtils.randomString(),
                    date: '12-12-2024',
                    title: randomUtils.randomString(),
                    time: [{
                        _id: randomUtils.randomString(),
                        date: '12-12-2024',
                        time: 133
                    },
                    {
                        _id: randomUtils.randomString(),
                        date: '12-12-2025',
                        time: 144
                    }
                ]
                };
                //@TODO: Left off here
                // Act
                target.updateDateTimeOfTask(expected.id, )
                // Assert
            });
        });
    });
});