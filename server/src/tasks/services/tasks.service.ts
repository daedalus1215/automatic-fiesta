import { Injectable } from '@nestjs/common';
import { Task, TaskDocument } from '../schema/task/task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateTaskDto } from '../dtos/update-task/update-task.dto';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private model: Model<TaskDocument>) { }

    async findAll() {
        return await this.model.find();
    }

    async findOne(id: string) {
        if (!id) {
            throw new Error('Need id');
        }
        return await this.model.findById(id);
    }

    async update(dto: UpdateTaskDto) {
        if (!dto) {
            throw new Error('dto')
        }
        return await this.model.updateOne({ _id: dto.taskId }, dto);
    }


    //   fetchAllMonthTasks: (includeTags, excludeTags) => fetchAllMonthTasks(includeTags, excludeTags),
    //   updateTask: (dto) => updateTask(dto),
    //   updateDateTimeOfTask: (taskId, dateTime) => UpdateDateTimeRepository(taskId, dateTime),
    //   createDateTimeOfTask: (taskId) => CreateDateTimeRepository(taskId),
    //   fetchAllTaskTitles: (title) => FetchAllTaskTitlesRepository(title),
    //   fetchStackGraph: (date, days, predicates) => FetchStatsForStackForRangeOfDates(date, days, predicates),
}


