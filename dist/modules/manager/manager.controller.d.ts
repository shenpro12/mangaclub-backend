/// <reference types="multer" />
import { CreateMangaDto } from '../../dto/create_manga.dto';
import { ManagerService } from './manager.service';
import { CreateCategoryDto } from '../../dto/create_category.dto';
export declare class ManagerController {
    private readonly managerService;
    constructor(managerService: ManagerService);
    createManga(body: CreateMangaDto, file: Express.Multer.File): Promise<void>;
    createCategory(body: CreateCategoryDto): Promise<void>;
}
