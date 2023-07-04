import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMangaDto } from '../../dto/create_manga.dto';
import { Manga } from '../../entities/manga.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Category } from '../../entities/category.entity';
import { CreateCategoryDto } from '../../dto/create_category.dto';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Manga)
    private readonly mangaRepository: Repository<Manga>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async createManga(manga: CreateMangaDto, thumb_url: Express.Multer.File) {}

  async createCategory(category: CreateCategoryDto) {}
}
