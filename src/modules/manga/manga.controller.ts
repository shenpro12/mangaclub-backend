import { Controller, Get, Query, Param, Res } from '@nestjs/common';
import { MangaService } from './manga.service';
import { Response } from 'express';

@Controller('manga')
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}
  @Get()
  async allManga(@Query() query: any, @Res() res: Response) {
    const response = await this.mangaService.findAllManga(query);
    return res.status(response.status).json(response);
  }

  @Get(':slug')
  async manga(@Param('slug') slug: string, @Res() res: Response) {
    const response = await this.mangaService.findManga(slug);
    return res.status(response.status).json(response);
  }
}
