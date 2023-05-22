import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMangaDto } from 'src/dto/create_manga.dto';
import { Manga } from 'src/entities/manga.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Category } from 'src/entities/category.entity';
import { CreateCategoryDto } from 'src/dto/create_category.dto';

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
      // let category1 = new Category();
      // let category2 = new Category();
      // let category3 = new Category();
      // let category4 = new Category();
      // category1.id = '166ec2e6-48e2-4476-a8c3-1d35364058e7';
      // category2.id = 'ba5e248b-d566-46da-abca-0c9c65963f85';
      // category3.id = '457716e5-ba00-4d5b-ab26-5c7adefb05c8';
      // category4.id = '2971bfd9-374b-4156-8427-be9d49714bae';
      // let url = await this.cloudinaryService.uploadFile(thumb_url);
      // let mangaData = new Manga();
      // mangaData.name = manga.name;
      // mangaData.alternative = manga.alternative;
      // mangaData.author = manga.author;
      // mangaData.status = manga.status;
      // mangaData.thumb_url = url.url;
      // mangaData.slug = manga.slug;
      // mangaData.views = 0;
      // mangaData.description = manga.description;
      // mangaData.categories = [category1, category2, category3, category4];
      // let insert = await this.mangaRepository.save(mangaData);
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

  async createCategory(category: CreateCategoryDto) {
    try {
      let categoryData = new Category();
      categoryData.name = category.name;
      categoryData.slug = category.slug;
      let insert = await this.categoryRepository.save(categoryData);
      return {
        statusCode: 201,
        insertRecord: insert,
        message: 'insert success!',
      };
    } catch (err) {
      console.log(err);
      return { statusCode: 400, message: 'bad request!' };
    }
  }
}
