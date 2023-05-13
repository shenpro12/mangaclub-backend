import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manga } from 'src/entities/manga.entity';
import { MangaController } from './manga.controller';
import { MangaService } from './manga.service';
@Module({
  imports: [TypeOrmModule.forFeature([Manga])],
  controllers: [MangaController],
  providers: [MangaService],
})
export class MangaModule {}
