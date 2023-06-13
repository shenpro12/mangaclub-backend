import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNumberString } from 'class-validator';
import { ApiResponse } from 'src/classes';
import { PAGE_SIZE } from 'src/constant';
import { Manga } from 'src/entities/manga.entity';
import { getPages } from 'src/util/getPages';
import { mangaSort } from 'src/util/sort';
import { Repository } from 'typeorm';

@Injectable()
export class MangaService {
  constructor(
    @InjectRepository(Manga)
    private readonly mangaRepository: Repository<Manga>,
  ) {}

  async findAllManga(query?: any) {
    try {
      let mangaList = await this.mangaRepository.find({
        relations: {
          ratings: true,
          chapters: true,
        },
      });
      //
      let pages: Array<number> = [];
      let totalItem = mangaList.length;
      let maxPage = Math.ceil(mangaList.length / PAGE_SIZE);
      let currPage = query.page
        ? isNumberString(query.page)
          ? parseInt(query.page)
          : 1
        : 1;
      //
      if (query.sort) {
        mangaList = mangaSort(mangaList, query.sort);
      } else {
        mangaList = mangaSort(mangaList);
      }
      //
      if (mangaList.length && query.paging !== 'none') {
        mangaList = mangaList.slice(
          PAGE_SIZE * currPage - PAGE_SIZE,
          PAGE_SIZE * currPage,
        );
        if (mangaList.length) {
          pages = getPages(maxPage, currPage);
        }
      }
      //
      return new ApiResponse(200, 'success', '', {
        mangaList,
        page: currPage,
        pages,
        totalItem,
        maxPage,
      });
      //
    } catch (error) {
      console.log(error);
      return new ApiResponse(404, 'something wrong ', 'bad request');
    }
  }

  async findManga(slug: string) {
    try {
      let result = await this.mangaRepository.findOne({
        where: {
          slug: slug,
        },
        relations: {
          ratings: true,
          categories: true,
          bookmarks: true,
          chapters: { images: true },
        },
      });
      return new ApiResponse(200, 'success', '', result);
    } catch (error) {
      console.log(error);
      return new ApiResponse(404, 'something wrong ', 'bad request');
    }
  }
}
