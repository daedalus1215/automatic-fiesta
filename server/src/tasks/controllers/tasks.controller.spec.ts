import { TasksService } from "../services/tasks.service";
import { TasksController } from "./tasks.controller";

describe('TasksController', () => {
  let controller: TasksController;
  let taskServiceMock: TasksService;

  beforeEach(async () => {
    taskServiceMock = jest.fn() as unknown as TasksService;
    controller = new TasksController(taskServiceMock);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});