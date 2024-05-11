import { Todo } from "./todo.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TodoCategoryDocument = TodoCategory & Document;

@Schema()
export  class TodoCategory {
    @Prop()
    id:string;

    @Prop()
    name: string;

    @Prop()
    todos: Todo[];
}

export const TodoCategorySchema = SchemaFactory.createForClass(TodoCategory);
