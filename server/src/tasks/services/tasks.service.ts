import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskDocument } from '../schema/task/task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateTaskDto } from '../dtos/update-task/update-task.dto';
import { DateTimeDto } from '../dtos/update-task/date-time.dto';
import { DateUtil } from '../../utils/date-util';
import { FetchAllTaskTitles } from '../transacription-scripts/tasks/fetch-all-task-titles/fetch-all-task-titles.transcription-script';
import { CreateDateTimeOfTask } from '../transacription-scripts/tasks/create-date-time.transcription-script/create-date-time.transcription-script';
import { UpdateDateTime } from '../transacription-scripts/tasks/update-date-time/update-date-time.transcription-script';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name) private model: Model<TaskDocument>,
        private readonly fetchAllTaskTitles: FetchAllTaskTitles,
        private readonly createDateTimeOfTask: CreateDateTimeOfTask,
        private readonly updateDateTime: UpdateDateTime) { }

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
    async fetchAllTitles(title: string) {
        return await this.fetchAllTaskTitles.apply(title);
    }

    //@TODO: Unit test this
    async createDateTime(taskId: string) {
        return this.createDateTimeOfTask.apply(taskId);
    }
}