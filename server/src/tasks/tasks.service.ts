import { Injectable } from '@nestjs/common';
import { Task, TaskDocument } from './schema/task/task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

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
}
