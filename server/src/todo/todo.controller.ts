import { Body, Controller, Get, Injectable, Param, Patch, Post } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { TodoCategory } from "./entity/todo-category.schema";
import { CreateTodoCategoryDto } from "./dtos/create-todo-category.dto";
import { serialize } from "class-transformer";
import { Serialize } from "src/interceptors/serialize.interceptor";
import { CreateTodoDto } from "./dtos/create-todo.dto";
import { ToggleTodoDto } from "./dtos/toggle-todo.dto";

@Controller("/todos")
export class TodoController {
    constructor(private todoService: TodoService) { }

    @Get()
    async findAll() {
        return await this.todoService.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id') id: string) {
        return await this.todoService.findOne(id);
    }

    @Post()
    @Serialize(CreateTodoCategoryDto)
    createReport(@Body() body: CreateTodoCategoryDto) {
        return this.todoService.create(body);
    }

    @Post("/:id")
    @Serialize(CreateTodoDto)
    async addTodoToCategory(@Body() body: CreateTodoDto, @Param('id') id: string) {
        return await this.todoService.addTodoToCategory(id, body);
    }

    @Patch("/:categoryId")
    async toggleTodo(@Body() body: ToggleTodoDto, @Param('categoryId') categoryId: string) {
        return await this.todoService.toggleTodo(categoryId, body);
    }
}