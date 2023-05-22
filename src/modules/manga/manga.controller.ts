import { Controller, Get, Param } from '@nestjs/common';
import { MangaService } from './manga.service';
import { Manga } from 'src/entities/manga.entity';

@Controller('manga')
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}
  @Get()
  async allManga(): Promise<Manga[]> {
    return await this.mangaService.findAllManga();
  }

  @Get(':slug')
  async manga(@Param('slug') slug: string): Promise<Manga> {
    return await this.mangaService.findManga(slug);
  }
}
