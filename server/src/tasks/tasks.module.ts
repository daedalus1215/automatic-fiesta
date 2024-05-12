import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks.controller';
import { TasksService } from './services/tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schema/task/task.schema';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ]
})

export class TasksModule { }
