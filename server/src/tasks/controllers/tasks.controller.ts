import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { UpdateTaskDto } from '../dtos/update-task/update-task.dto';
import { DateTimeDto } from '../dtos/update-task/date-time.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {
    }

    @Get()
    async findAll() {
        console.log('findAll')
        return await this.taskService.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id') id: string) {
        console.log('findOne')
        return await this.taskService.findOne(id);
    }

    @Put()
    async updateTask(@Body() body: UpdateTaskDto) {
        console.log('updateTask', body);
        return await this.taskService.update(body);
    }

    @Put('/:taskId/dateTime/:id')
    async updateDateTimeOfTask(@Param('taskId') taskId, @Body() body: DateTimeDto) {
        console.log('updateTask', body);
        return await this.taskService.updateDateTimeOfTask(taskId, body);
    }

    @Get('/activities/months')
    async fetchAllMonthTasks(@Query('includeTags') includeTags: string[], @Query(' excludeTags') excludeTags: string[]) {
        return await this.taskService.fetchTasksForAllMonths(includeTags, excludeTags);
    }

    @Get('/tasks-titles')
    async fetchAllTaskTitles(@Query('title') title: string) {
        console.log('fetchAllTaskTitles');
        return await this.taskService.fetchAllTitles(title);
    }

    @Post('/:taskId/dateTime')
    async postDateTimeAction(@Param('taskId') taskId: string) {
        return await this.taskService.createDateTime(taskId);
    }
}
