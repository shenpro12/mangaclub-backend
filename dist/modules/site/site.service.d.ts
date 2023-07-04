import { ApiResponse } from '../../classes';
import { Category } from '../../entities/category.entity';
import { Manga } from '../../entities/manga.entity';
import { Repository } from 'typeorm';
export declare class SiteService {
    private readonly categoryRepository;
    private readonly mangaRepository;
    constructor(categoryRepository: Repository<Category>, mangaRepository: Repository<Manga>);
    findAllGenre(): Promise<ApiResponse>;
    getMangaByGenre(genre: string, query: any): Promise<ApiResponse>;
    searchManga(query: any): Promise<ApiResponse>;
}
