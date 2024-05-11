import { Expose } from "class-transformer";

export class CreateTodoDto {
    @Expose()
    name: string

    @Expose()
    isDeleted: boolean;

    @Expose()
    isChecked: boolean;
}