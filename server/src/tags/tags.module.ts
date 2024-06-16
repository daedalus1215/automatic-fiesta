import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagController } from './controllers/tag.controller';
import { Tag, TagSchema } from './schema/tag.schema';
import { UtilModule } from 'src/utils/utils.module';
import { TagService } from './services/tag.service';
@Module({
  controllers: [TagController],
  providers: [
    // Services
    TagService
    // Converters

    // Transcription Scripts

    // Activities TS
  ],
  imports: [
    MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
    UtilModule
  ]
})

export class TagsModule { }
