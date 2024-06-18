import { InjectModel } from "@nestjs/mongoose";
import { Tag, TagDocument } from "../schema/tag.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { TagRepository } from "src/tags/domain/ports/tag.repository";
import { TagEntity } from "src/tags/domain/entities/tag.entity";

@Injectable()
export class TagDAO implements TagRepository {
    constructor(@InjectModel(Tag.name) private model: Model<TagDocument>) { }

    async findAll() {
        return await this.model.find() as unknown as TagEntity[];
    }

    async findOne(id?: string) {
        return await this.model.findById(id) as unknown as TagEntity;
    }

    async delete(id: string) {
        const res = await this.model.deleteOne({ _id: id });
        if (res.deletedCount > 0) {
            return true;
        }

        return false;
    }

    async deleteAll() {
        const res = await this.model.deleteMany({});
        if (res.deletedCount > 0) {
            return true;
        }

        return false;
    }

    async create() {
        const tag = await this.model.create({
            description: 'temp description',
            name: 'temp name'
        });
        return await tag.save();
    }

    async update(dto) {
        const tag = await this.model.create({
            description: 'temp description',
            name: 'temp name'
        });
        return await tag.save();
    }
}