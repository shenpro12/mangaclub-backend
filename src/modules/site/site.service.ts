import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNumberString } from 'class-validator';
import { ApiResponse } from '../../classes';
import { PAGE_SIZE } from '../../constant';
import { Category } from '../../entities/category.entity';
import { Manga } from '../../entities/manga.entity';
import { getPages } from '../../util/getPages';
import { mangaSort } from '../../util/sort';
import { In, Like, Repository } from 'typeorm';

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Manga)
    private readonly mangaRepository: Repository<Manga>,
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
      return new ApiResponse(200, 'success', '', genres);
    } catch (error) {
      console.log(error);
      return new ApiResponse(404, 'songthing went wrong', 'bad request');
    }
  }

  async getMangaByGenre(genre: string, query: any) {
    try {
      let result: Category = await this.categoryRepository.findOne({
        where: {
          slug: genre,
        },
        relations: {
          manga: {
            ratings: true,
            categories: true,
            bookmarks: true,
            chapters: true,
          },
        },
      });

      let mangaList: Array<Manga> = [];
      let pages: Array<number> = [];
      let totalItem: number | undefined;
      let maxPage: number | undefined;
      let currPage: number | undefined;

      if (result) {
        mangaList = result.manga;
        totalItem = mangaList.length;
        maxPage = Math.ceil(mangaList.length / PAGE_SIZE);
        currPage = query.page
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
      }
      //
      for (let i = 0; i < mangaList.length; i++) {
        mangaList[i].chapters.sort((a, b) => b.order - a.order);
      }
      //

      return new ApiResponse(200, 'success', '', {
        mangaList,
        page: currPage,
        pages,
        totalItem,
        maxPage,
      });
    } catch (error) {
      console.log(error);
      return new ApiResponse(404, 'songthing went wrong', 'bad request');
    }
  }

  async searchManga(query: any) {
    try {
      let findOption = {};
      if (query.keyword) {
        findOption['name'] = Like(`%${query.keyword}%`);
      }

      if (query.author) {
        findOption['author'] = Like(`%${query.author}%`);
      }
      if (query.status) {
        findOption['status'] =
          query.status === 'ongoing'
            ? false
            : query.status === 'completed'
            ? true
            : In([true, false]);
      }
      if (query.genre) {
        if (typeof query.genre === 'string') {
          findOption['categories'] = { name: query.genre };
        }
        if (typeof query.genre === 'object') {
          findOption['categories'] = { name: In(query.genre) };
        }
      }
      let mangaList = await this.mangaRepository.find({
        where: findOption,
        relations: { ratings: true, chapters: true },
      });
      //
      let pages: Array<number> = [];
      let totalItem: number | undefined;
      let maxPage: number | undefined;
      let currPage: number | undefined;

      if (mangaList) {
        totalItem = mangaList.length;
        maxPage = Math.ceil(mangaList.length / PAGE_SIZE);
        currPage = query.page
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
      }
      //
      for (let i = 0; i < mangaList.length; i++) {
        mangaList[i].chapters.sort((a, b) => b.order - a.order);
      } //
      return new ApiResponse(200, 'success', '', {
        mangaList,
        page: currPage,
        pages,
        totalItem,
        maxPage,
      });
    } catch (error) {
      console.log(error);
      return new ApiResponse(404, 'songthing went wrong', 'bad request');
    }
  }
}
