import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../entities/category.entity';
import { SiteController } from './site.controller';
import { SiteService } from './site.service';
import { Manga } from '../../entities/manga.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Category, Manga])],
  controllers: [SiteController],
  providers: [SiteService],
})
export class SiteModule {}
