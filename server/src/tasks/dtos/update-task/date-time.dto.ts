import { Expose } from "class-transformer";

export class DateTimeDto {
    @Expose()
    date:string;

    @Expose()
    id:string;

    @Expose()
    time:string;
}