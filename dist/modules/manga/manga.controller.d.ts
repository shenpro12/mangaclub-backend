import { MangaService } from './manga.service';
import { Response } from 'express';
export declare class MangaController {
    private readonly mangaService;
    constructor(mangaService: MangaService);
    getChapterById(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getMangaByid(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getRelatedManga(query: any, res: Response): Promise<Response<any, Record<string, any>>>;
    manga(slug: string, res: Response): Promise<Response<any, Record<string, any>>>;
    allManga(query: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
