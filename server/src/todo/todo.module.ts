import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoCategory, TodoCategorySchema } from './entity/todo-category.schema';
import { TodoController } from './todo.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{name: TodoCategory.name, schema: TodoCategorySchema}])],
    providers: [TodoService],
    controllers: [TodoController]
})
export class TodoModule { }
