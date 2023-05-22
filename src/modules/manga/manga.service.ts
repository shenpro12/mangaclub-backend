import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manga } from 'src/entities/manga.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MangaService {
  constructor(
    @InjectRepository(Manga)
    private readonly mangaRepository: Repository<Manga>,
  ) {}

  async findAllManga() {
    try {
      return await this.mangaRepository.find({
        relations: {
          ratings: true,
          chapters: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findManga(slug: string) {
    try {
      return await this.mangaRepository.findOne({
        where: {
          slug: slug,
        },
        relations: {
          ratings: true,
          categories: true,
          bookmarks: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
