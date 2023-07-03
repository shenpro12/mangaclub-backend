/// <reference types="multer" />
import { CreateMangaDto } from 'src/dto/create_manga.dto';
import { Manga } from 'src/entities/manga.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Category } from 'src/entities/category.entity';
import { CreateCategoryDto } from 'src/dto/create_category.dto';
export declare class ManagerService {
    private readonly mangaRepository;
    private readonly categoryRepository;
    private readonly cloudinaryService;
    constructor(mangaRepository: Repository<Manga>, categoryRepository: Repository<Category>, cloudinaryService: CloudinaryService);
    createManga(manga: CreateMangaDto, thumb_url: Express.Multer.File): Promise<void>;
    createCategory(category: CreateCategoryDto): Promise<void>;
}
