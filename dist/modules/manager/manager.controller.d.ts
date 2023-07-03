/// <reference types="multer" />
import { CreateMangaDto } from 'src/dto/create_manga.dto';
import { ManagerService } from './manager.service';
import { CreateCategoryDto } from 'src/dto/create_category.dto';
export declare class ManagerController {
    private readonly managerService;
    constructor(managerService: ManagerService);
    createManga(body: CreateMangaDto, file: Express.Multer.File): Promise<void>;
    createCategory(body: CreateCategoryDto): Promise<void>;
}
