import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class Todo {
    @Prop()
    id:string;

    @Prop()
    name: string

    @Prop()
    isDeleted: boolean;

    @Prop()
    isChecked: boolean;
}