import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< HEAD
import { Manga } from '../../entities/manga.entity';
import { MangaController } from './manga.controller';
import { MangaService } from './manga.service';
import { Chapter } from '../../entities/chapter.entity';
=======
import { Chapter } from '../../entities/chapter.entity';
import { Manga } from 'src/entities/manga.entity';
import { MangaController } from './manga.controller';
import { MangaService } from './manga.service';

>>>>>>> 3e79b29131a71900b11e3375a2568f78394e5c67
@Module({
  imports: [TypeOrmModule.forFeature([Manga, Chapter])],
  controllers: [MangaController],
  providers: [MangaService],
})
export class MangaModule {}
