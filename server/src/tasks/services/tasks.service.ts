import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskDocument } from '../schema/task/task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateTaskDto } from '../dtos/update-task/update-task.dto';
import { DateTimeDto } from '../dtos/update-task/date-time.dto';
import { minutesToMilliseconds } from 'src/utils/minutesToMilliseconds';

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

    async updateDateTimeOfTask(taskId: string, dto: DateTimeDto) {
        const task = await this.model.findOne({ _id: taskId });

        if (!task) {
            throw new NotFoundException("task not found");
        }

        const dateTimes = task.time.map((dateTimeFromDb) => {
            if (dateTimeFromDb._id == dto._id) {
                return Object.assign(dateTimeFromDb, { ...dto, time: minutesToMilliseconds(dto.time) });
            }

            return dateTimeFromDb;
        });

        task.time = dateTimes;
        task.date = dto.date;
        return await task.save();
    }

    //   updateDateTimeOfTask: (taskId, dateTime) => UpdateDateTimeRepository(taskId, dateTime),

    //   fetchAllMonthTasks: (includeTags, excludeTags) => fetchAllMonthTasks(includeTags, excludeTags),
    //   createDateTimeOfTask: (taskId) => CreateDateTimeRepository(taskId),
    //   fetchAllTaskTitles: (title) => FetchAllTaskTitlesRepository(title),
    //   fetchStackGraph: (date, days, predicates) => FetchStatsForStackForRangeOfDates(date, days, predicates),
}


