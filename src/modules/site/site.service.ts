import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async findAllGenre() {
    try {
      let genres: Array<any> = await this.categoryRepository.find({
        relations: { manga: true },
      });
      for (let i = 0; i < genres.length; i++) {
        genres[i].manga = genres[i].manga.length;
      }
      genres.sort((a, b) => {
        let a_charCode: number = a.name.toLowerCase().slice(0, 1).charCodeAt();
        let b_charCode: number = b.name.toLowerCase().slice(0, 1).charCodeAt();
        return a_charCode - b_charCode;
      });
      return genres;
    } catch (error) {
      console.log(error);
    }
  }
}
