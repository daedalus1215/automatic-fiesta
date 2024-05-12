import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export class TimeVO {
    @Prop({ required: true})
    _id: string;

    @Prop()
    date: string;

    @Prop()
    time: number;
}
