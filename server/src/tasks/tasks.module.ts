import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks.controller';
import { TasksService } from './services/tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schema/task/task.schema';
import { UtilModule } from 'src/utils/utils.module';
import { GroupTitlesBasedOnDateAssembler } from './assemblers/group-titles-based-on-date-assembler';

@Module({
  controllers: [TasksController],
  providers: [TasksService, GroupTitlesBasedOnDateAssembler],
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    UtilModule
  ]
})

export class TasksModule { }
