import { Expose } from "class-transformer";
import { tagDto } from "src/tags/domain/dtos/tag.dto";

export class UpdateTagDto implements tagDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    description: string;
}