import { Expose } from "class-transformer";
import { Todo } from "../entity/todo.schema";
import { CreateTodoDto } from "./create-todo.dto";

export class CreateTodoCategoryDto {
    @Expose()
    name: string;
    @Expose()
    todos: CreateTodoDto[];
}