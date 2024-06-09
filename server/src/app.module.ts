import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';
import { TodoCategory, TodoCategorySchema } from './todo/entity/todo-category.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { Task, TaskSchema } from './tasks/schema/task/task.schema';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`),
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: TodoCategory.name, schema: TodoCategorySchema }
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TodoModule,
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
