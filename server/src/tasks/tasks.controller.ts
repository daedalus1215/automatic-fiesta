import { Controller, Get, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {
    }

    @Get('/:id')
    async findOne(@Param('id') id: string) {
        return await this.taskService.findOne(id);
    }
}
