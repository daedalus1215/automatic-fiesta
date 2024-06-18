import { tagDto } from "../dtos/tag.dto";
import { TagEntity } from "../entities/tag.entity";

export interface TagRepository {
    findAll(): Promise<TagEntity[]>;
    findOne(id?: string): Promise<TagEntity>;
    delete(id: string): Promise<boolean>;
    deleteAll(): Promise<boolean>;
    create(): Promise<TagEntity>;
    update(dto: tagDto): Promise<TagEntity>;
}