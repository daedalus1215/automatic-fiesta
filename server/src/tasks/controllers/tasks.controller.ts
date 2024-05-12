import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { UpdateTaskDto } from '../dtos/update-task/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {
    }

    async findAll() {
        return await this.taskService.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id') id: string) {
        return await this.taskService.findOne(id);
    }

    @Put()
    async updateTask(@Body() body: UpdateTaskDto) {
        console.log('updateTask', body)
        return await this.taskService.update(body);
    }
}
