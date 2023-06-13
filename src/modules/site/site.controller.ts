import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { SiteService } from './site.service';
import { Response } from 'express';

@Controller()
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Get('manga-genre/:genreSlug')
  async mangaByGenre(
    @Param('genreSlug') genreSlug: string,
    @Query() query: any,
    @Res() res: Response,
  ) {
    const response = await this.siteService.getMangaByGenre(genreSlug, query);
    return res.status(response.status).json(response);
  }

  @Get('search')
  async searchManga(@Query() query: any, @Res() res: Response) {
    const response = await this.siteService.searchManga(query);
    return res.status(response.status).json(response);
  }

  @Get('genre')
  async allGenre(@Res() res: Response) {
    const response = await this.siteService.findAllGenre();
    return res.status(response.status).json(response);
  }
}
