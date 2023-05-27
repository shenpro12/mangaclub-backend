import { Controller, Get } from '@nestjs/common';
import { SiteService } from './site.service';

@Controller()
export class SiteController {
  constructor(private readonly siteService: SiteService) {}
  @Get('genre')
  async allGenre() {
    return await this.siteService.findAllGenre();
  }
}
