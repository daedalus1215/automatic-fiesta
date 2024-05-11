import { Expose } from "class-transformer";

export class ToggleTodoDto {
    @Expose()
    name: string;

    @Expose()
    isChecked: boolean;
}