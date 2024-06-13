import { faker } from '@faker-js/faker';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskDocument } from '../schema/task/task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateTaskDto } from '../dtos/update-task/update-task.dto';
import { DateTimeDto } from '../dtos/update-task/date-time.dto';
import { TimeVO } from '../schema/task/time.vo';
import { StringUtil } from '../../utils/string-util';
import { DateUtil } from '../../utils/date-util';
import { FetchAllMonthTasks } from '../transacription-scripts/fetch-all-month-tasks/fetch-all-month-tasks.transcription-script';
import { FetchAllTaskTitles } from '../transacription-scripts/fetch-all-task-titles/fetch-all-task-titles.transcription-script';
import { CreateDateTimeOfTask } from '../transacription-scripts/create-date-time.transcription-script/create-date-time.transcription-script';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name) private model: Model<TaskDocument>,
        private readonly stringUtil: StringUtil,
        private readonly dateUtil: DateUtil,
        private readonly fetchAllMonthTasks: FetchAllMonthTasks,
        private readonly fetchAllTaskTitles: FetchAllTaskTitles,
        private readonly createDateTimeOfTask: CreateDateTimeOfTask,
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

    async updateDateTimeOfTask(taskId: string, dto: DateTimeDto) {
        const task = await this.model.findById(taskId);

        if (!task) {
            throw new NotFoundException("task not found");
        }

        const dateTimes = task.time.map((dateTimeFromDb) => {
            if (dateTimeFromDb._id == dto._id) {
                return Object.assign(dateTimeFromDb, { ...dto, time: this.dateUtil.minutesToMilliseconds(dto.time) });
            }

            return dateTimeFromDb;
        });

        task.time = dateTimes;
        task.date = dto.date;
        return await task.save();
    }

    //@TODO: Unit test this
    fetchTasksForAllMonths(includeTags?: string[], excludeTags?: string[]) {
        return this.fetchAllMonthTasks.apply(includeTags, excludeTags);
    };

    //@TODO: Unit test this
    async fetchAllTitles(title: string) {
        return await this.fetchAllTaskTitles.apply(title);
    }

    async createDateTime(taskId: string) {
        return this.createDateTimeOfTask.apply(taskId);
    }

    // @TODO: Bring this back after we migrate to class utils
    async fetchStatsForStackForRangeOfDates(date: Date, days: number, predicates: { includeTags?: string, excludeTags?: string }) {
        const dates = this.dateUtil.getRangeOfDates(date, days);
        const tasks = await this.stringUtil.getTaskBasedOnTags(this.model, predicates);
        let datasets = [];
        for (let task of tasks) {
            const dataset = {
                label: this.stringUtil.getTitle(task),
                data: Array(days).fill(0),
                backgroundColor: `rgb(${faker.number.int({ min: 100, max: 255 })}, ${faker.number.int({ min: 100, max: 255 })}, ${faker.number.int({ min: 100, max: 255 })})`
            };

            for (let time of task.time) {
                const currentDate = this.dateUtil.formatDate(time.date);
                if (currentDate === null || currentDate < dates[dates.length - 1]) {
                    continue;
                }

                let index = dates.findIndex(item => {
                    return item === currentDate;
                });
                if (index !== -1) {
                    if (dataset.data[index] >= 0) {
                        dataset.data[index] = dataset.data[index] + (time?.time / 1000 / 60 ?? 0)
                    } else {
                        dataset.data[index] = (time?.time / 1000 / 60 ?? 0)
                    }
                }
            }

            if (dataset.data.find(data => data > 0)) {
                datasets.push(dataset);
            }
        }

        return {
            data: {
                labels: dates,
                datasets
            },
            options: {
                "plugins": {
                    "title": {
                        "display": true,
                        "text": `Stacked Activity over ${days} days`
                    }
                },
                "responsive": true,
                "scales": {
                    "x": {
                        "stacked": true
                    },
                    "y": {
                        "stacked": true
                    }
                }
            }
        }
    }
}