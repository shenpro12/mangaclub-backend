import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMangaDto } from 'src/dto/create_manga.dto';
import { Manga } from 'src/entities/manga.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Manga)
    private readonly mangaRepository: Repository<Manga>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async createManga(manga: CreateMangaDto, thumb_url: Express.Multer.File) {
    try {
      return {
        statusCode: 201,
        insertRecord: {},
        message: 'insert success!',
      };
    } catch (err) {
      console.log(err);
      return { statusCode: 400, message: 'bad request!' };
    }
  }
}
