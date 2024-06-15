import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks/tasks.controller';
import { TasksService } from './services/tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schema/task/task.schema';
import { UtilModule } from 'src/utils/utils.module';
import { FetchAllTaskTitles } from './transacription-scripts/tasks/fetch-all-task-titles/fetch-all-task-titles.transcription-script';
import { CreateDateTimeOfTask } from './transacription-scripts/tasks/create-date-time.transcription-script/create-date-time.transcription-script';
import { FetchStatsForStackForRangeOfDates } from './transacription-scripts/activities/fetch-stats-for-stack-for-range/fetch-stats-for-stack-for-range-dates.transcription-scripts';
import { UpdateDateTime } from './transacription-scripts/tasks/update-date-time/update-date-time.transcription-script';
import { ActivityService } from './services/activity.service';
import { ActivityController } from './controllers/activity/activity.controller';
import { FetchAllMonthTasks } from './transacription-scripts/activities/fetch-all-month-tasks/fetch-all-month-tasks.transcription-script';
import { GroupTitlesFormatConverter } from './transacription-scripts/activities/fetch-all-month-tasks/converters/group-titles-format.converter';
import { GroupTitlesBasedOnDateConverter } from './transacription-scripts/activities/fetch-all-month-tasks/converters/group-titles-based-on-date.converter';

@Module({
  controllers: [TasksController, ActivityController],
  providers: [
    // Services
    TasksService,
    ActivityService,

    // Converters
    GroupTitlesBasedOnDateConverter,
    GroupTitlesFormatConverter,

    // Transcription Scripts
    FetchAllMonthTasks,
    FetchAllTaskTitles,
    CreateDateTimeOfTask,
    FetchStatsForStackForRangeOfDates,
    UpdateDateTime
  ],
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    UtilModule
  ]
})

export class TasksModule { }
