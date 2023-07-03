import { SiteService } from './site.service';
import { Response } from 'express';
export declare class SiteController {
    private readonly siteService;
    constructor(siteService: SiteService);
    mangaByGenre(genreSlug: string, query: any, res: Response): Promise<Response<any, Record<string, any>>>;
    searchManga(query: any, res: Response): Promise<Response<any, Record<string, any>>>;
    allGenre(res: Response): Promise<Response<any, Record<string, any>>>;
}
