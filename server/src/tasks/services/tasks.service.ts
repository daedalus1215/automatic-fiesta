import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskDocument } from '../schema/task/task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateTaskDto } from '../dtos/update-task/update-task.dto';
import { DateTimeDto } from '../dtos/update-task/date-time.dto';
import { exclusiveFilter } from '../../utils/exclusiveFilter';
import { inclusiveFilter } from '../../utils/inclusiveFilter';
import { formatMonth } from '../../utils/getDate';
import { truncateString } from '../../utils/truncateString';
import { minutesToMilliseconds } from '../../utils/minutesToMilliseconds';

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

    async fetchAllMonthTasks(includeTags, excludeTags) {
        const tasks = await this.model.find();
        const results = {};
        const tagsWithoutExcluded = exclusiveFilter(tasks.filter(task => task?.date), excludeTags);
        const includedAndExcludedTags = inclusiveFilter(tagsWithoutExcluded, includeTags);

        includedAndExcludedTags.forEach(task => {
            task.time
                .filter(time => time?.date)
                .map(time => {
                    const theDate = formatMonth(time.date);

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
                title: (task.title !== undefined) ? truncateString(task.title, 21) : 'no title'
            }));
    }


    //@TODO: Continue here!
    //   fetchAllMonthTasks: (includeTags, excludeTags) => fetchAllMonthTasks(includeTags, excludeTags),
    //   createDateTimeOfTask: (taskId) => CreateDateTimeRepository(taskId),
    //   fetchAllTaskTitles: (title) => FetchAllTaskTitlesRepository(title),
    //   fetchStackGraph: (date, days, predicates) => FetchStatsForStackForRangeOfDates(date, days, predicates),
}


