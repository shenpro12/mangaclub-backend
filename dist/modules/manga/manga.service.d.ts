import { ApiResponse } from '../../classes';
import { Chapter } from '../../entities/chapter.entity';
import { Manga } from '../../entities/manga.entity';
import { Repository } from 'typeorm';
export declare class MangaService {
    private readonly mangaRepository;
    private readonly chapterRepository;
    constructor(mangaRepository: Repository<Manga>, chapterRepository: Repository<Chapter>);
    findAllManga(query?: any): Promise<ApiResponse>;
    findManga(slug: string): Promise<ApiResponse>;
    findMangaById(id: string): Promise<ApiResponse>;
    getRelatedManga(genres: Array<string>, limit: number): Promise<ApiResponse>;
    findChapterById(id: string): Promise<ApiResponse>;
}
