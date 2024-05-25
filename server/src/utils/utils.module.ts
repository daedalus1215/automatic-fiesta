import { Module } from '@nestjs/common';
import { StringUtil } from './string-util';
import { DateUtil } from './date-util';
import { FilterUtil } from './filter-util';

@Module({
  providers: [StringUtil, DateUtil, FilterUtil],
  exports: [StringUtil, DateUtil, FilterUtil],
})

export class UtilModule { }
