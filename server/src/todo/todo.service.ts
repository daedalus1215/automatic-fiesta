import { Injectable } from '@nestjs/common';
import { TodoCategory, TodoCategoryDocument } from './entity/todo-category.schema';
import { CreateTodoCategoryDto } from './dtos/create-todo-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { ToggleTodoDto } from './dtos/toggle-todo.dto';
import { Todo } from './entity/todo.schema';

@Injectable()
export class TodoService {
    constructor(@InjectModel(TodoCategory.name) private model: Model<TodoCategoryDocument>) { }

    async findAll() {
        return await this.model.find();
    }

    async findOne(id: string) {
        if (!id) {
            throw new Error('Need id');
        }
        return await this.model.findById(id);
    }

    async create(dto: CreateTodoCategoryDto) {
        const todo = await this.model.create((dto as TodoCategory));
        return todo.save();
    }

    async addTodoToCategory(id: string, body: CreateTodoDto) {
        const todoCategory = await this.model.findById(id);
        if (!todoCategory) {
            throw new Error('No todos found with id');
        }

        todoCategory.todos.push((body as Todo));
        return await todoCategory.save();
    }

    async toggleTodo(categoryId: string, dto: ToggleTodoDto) {
        const categoryTodos = await this.model.findById(categoryId);
        if (!categoryTodos) {
            throw new Error('No todos found with id');
        }
        const todos = categoryTodos.todos.map(todo => {
            if (todo.name === dto.name) {
                const newTodo = { ...todo, isChecked: dto.isChecked }
                return newTodo;
            }
            return todo
        });

        categoryTodos.todos = todos;
        return await categoryTodos.save();
    }
}
