import { InjectModel } from "@nestjs/mongoose";
import { Tag, TagDocument } from "../../infrastructure/schema/tag.schema";
import { Model } from "mongoose";
import { Inject, Injectable } from "@nestjs/common";
import { TagRepository } from "../ports/tag.repository";
import { tagDto } from "../dtos/tag.dto";
import { TagEntity } from "../entities/tag.entity";

@Injectable()
export class TagService {

    constructor(@Inject('TagRepository') private repository: TagRepository,
        @InjectModel(Tag.name) private model: Model<TagDocument>) {
    }

    async findAll() {
        return await this.repository.findAll();
    }

    async findOne(id?: string) {
        if (!id) {
            throw new Error('Need id');
        }
        return await this.repository.findOne(id);
    }

    async delete(id: string): Promise<any> {
        return await this.model.deleteOne({ _id: id });
    }

    async deleteAll(): Promise<any> {
        return await this.model.deleteMany({});
    }

    async create(): Promise<Tag> {
        const tag = await this.model.create({
            description: 'temp description',
            name: 'temp name'
        });
        return await tag.save();
    }

    async update(dto: tagDto): Promise<TagEntity> {
        const tag = await this.model.findById(dto.id);
        tag.name = dto.name;
        tag.description = dto.description;
        return await tag.save();
    }

    // [x] - fetchTagById: (tagId, res) => fetchTagById(tagId, res),
    // [x] - fetchAllTags: (res) => fetchAllTags(res),
    // [x] - deleteTag: (tagId, res) => deleteTag(tagId, res),
    // [x] - addTag: (dto) => addTag(dto),
    // [x] - addTagByName: (tagName) => addTagByName(tagName), - don't need

    // [] - updateTag: (tagDto) => updateTag(tagDto),
    // [] - importTags: (tasks) => importTags(tasks),
}