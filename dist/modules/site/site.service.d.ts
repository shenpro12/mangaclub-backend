import { ApiResponse } from 'src/classes';
import { Category } from 'src/entities/category.entity';
import { Manga } from 'src/entities/manga.entity';
import { Repository } from 'typeorm';
export declare class SiteService {
    private readonly categoryRepository;
    private readonly mangaRepository;
    constructor(categoryRepository: Repository<Category>, mangaRepository: Repository<Manga>);
    findAllGenre(): Promise<ApiResponse>;
    getMangaByGenre(genre: string, query: any): Promise<ApiResponse>;
    searchManga(query: any): Promise<ApiResponse>;
}
