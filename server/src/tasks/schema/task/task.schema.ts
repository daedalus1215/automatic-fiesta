import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { TimeVO } from "./time.vo";

export type TaskDocument = Task & Document;

@Schema()
export class Task {
    @Prop({ alias: "_id" })
    id: string;

    @Prop()
    tags: string[];

    @Prop({ trim: true })
    description: string;

    @Prop({ required: true })
    date: string;

    @Prop({ trim: true })
    title: string;

    @Prop()
    time: TimeVO[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
