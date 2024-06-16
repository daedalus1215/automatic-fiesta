import { InjectModel } from "@nestjs/mongoose";
import { Tag, TagDocument } from "../schema/tag.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TagService {
    constructor(@InjectModel(Tag.name) private model: Model<TagDocument>){}
    
    async findAll() {
        return await this.model.find();
    }

    async findOne(id?: string) {
        if (!id) {
            throw new Error('Need id');
        }
        return await this.model.findById(id);
    }

    async delete(id: string): Promise<any> {
        return await this.model.deleteOne({ _id: id });
    }

    async deleteAll(): Promise<any> {
        return await this.model.deleteMany({});
    }

    // [x] - fetchTagById: (tagId, res) => fetchTagById(tagId, res),
    // [x] - fetchAllTags: (res) => fetchAllTags(res),
    // [x] - deleteTag: (tagId, res) => deleteTag(tagId, res),

    // [] - addTag: (dto) => addTag(dto),
    // [] - addTagByName: (tagName) => addTagByName(tagName),
    // [] - updateTag: (tagDto) => updateTag(tagDto),
    // [] - importTags: (tasks) => importTags(tasks),
}