import { Controller, Delete, Get, Param, Query } from "@nestjs/common";
import { TagService } from "../services/tag.service";

@Controller('tags')
export class TagController {
    constructor(private readonly service: TagService) { }

    @Get()
    async findAll() {
        console.log('findAll')
        return await this.service.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id') id?: string) {
        return await this.service.findOne(id);
    }

    @Delete('/:id')
    async deleteTask(@Query('id') id: string) {
        return await this.service.delete(id);
    }

    @Delete()
    async deleteTasks() {
        return await this.service.deleteAll();
    }

}