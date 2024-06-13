import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks.controller';
import { TasksService } from './services/tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schema/task/task.schema';
import { UtilModule } from 'src/utils/utils.module';
import { GroupTitlesBasedOnDateConverter } from './transacription-scripts/fetch-all-month-tasks/converters/group-titles-based-on-date.converter';
import { GroupTitlesFormatConverter } from './transacription-scripts/fetch-all-month-tasks/converters/group-titles-format.converter';
import { FetchAllMonthTasks } from './transacription-scripts/fetch-all-month-tasks/fetch-all-month-tasks.transcription-script';
import { FetchAllTaskTitles } from './transacription-scripts/fetch-all-task-titles/fetch-all-task-titles.transcription-script';
import { CreateDateTimeOfTask } from './transacription-scripts/create-date-time.transcription-script/create-date-time.transcription-script';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService, 
    GroupTitlesBasedOnDateConverter, 
    GroupTitlesFormatConverter, 
    // Transcription Scripts
    FetchAllMonthTasks,
    FetchAllTaskTitles,
    CreateDateTimeOfTask
  ],
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    UtilModule
  ]
})

export class TasksModule { }
