import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskDocument } from '../schema/task/task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateTaskDto } from '../dtos/update-task/update-task.dto';
import { DateTimeDto } from '../dtos/update-task/date-time.dto';
import { DateUtil } from '../../utils/date-util';
import { FetchAllMonthTasks } from '../transacription-scripts/fetch-all-month-tasks/fetch-all-month-tasks.transcription-script';
import { FetchAllTaskTitles } from '../transacription-scripts/fetch-all-task-titles/fetch-all-task-titles.transcription-script';
import { CreateDateTimeOfTask } from '../transacription-scripts/create-date-time.transcription-script/create-date-time.transcription-script';
import { FetchStatsForStackForRangeOfDates } from '../transacription-scripts/fetch-stats-for-stack-for-range/fetch-stats-for-stack-for-range-dates.transcription-scripts';
import { UpdateDateTime } from '../transacription-scripts/update-date-time/update-date-time.transcription-script';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name) private model: Model<TaskDocument>,
        private readonly dateUtil: DateUtil,
        private readonly fetchAllMonthTasks: FetchAllMonthTasks,
        private readonly fetchAllTaskTitles: FetchAllTaskTitles,
        private readonly createDateTimeOfTask: CreateDateTimeOfTask,
        private readonly fetchStatsForStackForRangeOfDates: FetchStatsForStackForRangeOfDates,
        private readonly updateDateTime: UpdateDateTime
    ) { }

    async findAll() {
        return await this.model.find();
    }

    async findOne(id?: string) {
        if (!id) {
            throw new Error('Need id');
        }
        return await this.model.findById(id);
    }

    async update(dto?: UpdateTaskDto) {
        if (!dto) {
            throw new Error('dto')
        }
        return await this.model.updateOne({ _id: dto.taskId }, dto);
    }
    
    //@TODO: Unit test this
    async updateDateTimeOfTask(taskId: string, dto: DateTimeDto) {
        return this.updateDateTime.apply(taskId, dto);
    }

    //@TODO: Unit test this
    fetchTasksForAllMonths(includeTags?: string[], excludeTags?: string[]) {
        return this.fetchAllMonthTasks.apply(includeTags, excludeTags);
    };

    //@TODO: Unit test this
    async fetchAllTitles(title: string) {
        return await this.fetchAllTaskTitles.apply(title);
    }

    //@TODO: Unit test this
    async createDateTime(taskId: string) {
        return this.createDateTimeOfTask.apply(taskId);
    }

    // @TODO: Bring this back after we migrate to class utils
    async fetchStats(date: Date, days: number, predicates: { includeTags?: string, excludeTags?: string }) {
        return this.fetchStatsForStackForRangeOfDates.apply(date, days, predicates)
    }
}