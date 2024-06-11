import { faker } from '@faker-js/faker';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskDocument } from '../schema/task/task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateTaskDto } from '../dtos/update-task/update-task.dto';
import { DateTimeDto } from '../dtos/update-task/date-time.dto';
import { TimeVO } from '../schema/task/time.vo';
import { StringUtil } from '../../utils/string-util';
import { FilterUtil } from '../../utils/filter-util';
import { DateUtil } from '../../utils/date-util';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name) private model: Model<TaskDocument>,
        private readonly stringUtil: StringUtil,
        private readonly filterUtil: FilterUtil,
        private readonly dateUtil: DateUtil
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
        const task = await this.model.findOne({ _id: taskId });

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

    async fetchAllMonthTasks(includeTags, excludeTags) {
        const tasks = await this.model.find();
        const results = {};
        const tagsWithoutExcluded = this.filterUtil.exclusiveFilter(tasks.filter(task => !!task.date), excludeTags);
        const includedAndExcludedTags = this.filterUtil.inclusiveFilter(tagsWithoutExcluded, includeTags);

        includedAndExcludedTags.forEach(task => {
            task.time
                .filter(time => time?.date)
                .forEach(time => {
                    const theDate = this.dateUtil.formatMonth(time.date);

                    if (!results[theDate]) {
                        results[theDate] = { time: 0, titles: [] };
                    }

                    results[theDate].time += time.time;

                    const title = task?.title ?? 'no title';

                    if (results[theDate]?.titles.indexOf(title) === -1) {
                        results[theDate].titles.push(title);
                    }

                });
        });
        const newResults = [];
        const keys = Object.keys(results);

        for (let key of keys) {
            newResults.push({
                date: key,
                ...results[key]
            })
        }

        return newResults
            .sort(this.sort);
    };

    sort(firstDate: any, secondDate: any) {
        return (new Date(firstDate.date) as any) - (new Date(secondDate.date) as any)
    }

    async fetchAllTaskTitles(title: string) {
        const tasks = await this.model.find();
        tasks.sort(this.sort); // Sort tasks by date in descending order
        const formattedName = title?.toLowerCase();
        return tasks
            .filter((task) => {
                if (title) {
                    return task?.title?.toLowerCase().includes(formattedName) ?? false;
                }

                return true;
            })
            .map((task) => ({
                _id: task?._id ?? 'stubAnId',
                title: (task.title !== undefined) ? this.stringUtil.truncateString(task.title, 21) : 'no title'
            }));
    }

    async createDateTimeOfTask(taskId: string) {
        const task = await this.model.findOne({ _id: taskId });
        // @TODO: add this to my UTs
        if (!task) {
            throw new NotFoundException(`no task with taskId ${taskId}`)
        }
        const { time } = task;
        time.push({
            date: new Date(),
            time: this.dateUtil.minutesToMilliseconds("00:00"),
        } as unknown as TimeVO);

        task.time = time;
        task.date = new Date().toString();
        const updatedTask = await task.save();
        return updatedTask;
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