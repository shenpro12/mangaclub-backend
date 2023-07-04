import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNumberString } from 'class-validator';
<<<<<<< HEAD
import { ApiResponse } from '../../classes';
import { PAGE_SIZE } from '../../constant';
import { Chapter } from '../../entities/chapter.entity';
import { Manga } from '../../entities/manga.entity';
import { getPages } from '../../util/getPages';
import { mangaSort } from '../../util/sort';
=======
import { PAGE_SIZE } from 'src/constant';
import { Chapter } from 'src/entities/chapter.entity';
import { ApiResponse } from 'src/classes';
import { Manga } from 'src/entities/manga.entity';
import { getPages } from 'src/util/getPages';
import { mangaSort } from 'src/util/sort';
>>>>>>> 3e79b29131a71900b11e3375a2568f78394e5c67
import { In, Repository } from 'typeorm';

@Injectable()
export class MangaService {
  constructor(
    @InjectRepository(Manga)
    private readonly mangaRepository: Repository<Manga>,
    @InjectRepository(Chapter)
    private readonly chapterRepository: Repository<Chapter>,
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
      //
    } catch (error) {
      console.log(error);
      return new ApiResponse(404, 'something wrong ', 'bad request');
    }
  }

  async findManga(slug: string) {
    try {
      let result: Manga = await this.mangaRepository.findOne({
        where: {
          slug: slug,
        },
        relations: {
          ratings: true,
          categories: true,
          bookmarks: { account: true },
          chapters: { images: true },
        },
      });

      result.chapters.sort((a, b) => b.order - a.order);

      result.bookmarks = result.bookmarks.map((i) => ({
        ...i,
        account: {
          ...i.account,
          password: null,
          createdAt: null,
          updatedAt: null,
          deleteAt: null,
          isAdmin: null,
          email: null,
          userName: null,
          avatar: null,
        },
      }));

      return new ApiResponse(200, 'success', '', result);
    } catch (error) {
      console.log(error);
      return new ApiResponse(404, 'something wrong ', 'bad request');
    }
  }

  async findMangaById(id: string) {
    try {
      let result: Manga = await this.mangaRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          ratings: true,
          categories: true,
          bookmarks: true,
          chapters: { images: true },
        },
      });
      if (result) {
        result.chapters.sort((a, b) => b.order - a.order);
      }
      //console.log(result);

      return new ApiResponse(200, 'success', '', result);
    } catch (error) {
      console.log(error);
      return new ApiResponse(404, 'something wrong ', 'bad request');
    }
  }

  async getRelatedManga(genres: Array<string>, limit: number) {
    try {
      let manga: Array<Manga> = await this.mangaRepository.find({
        where: { categories: { name: In(genres ? genres : []) } },
        take: limit,
      });
      return new ApiResponse(200, 'success', '', { mangaList: manga });
    } catch (error) {
      console.log(error);
      return new ApiResponse(404, 'songthing went wrong', 'bad request');
    }
  }

  async findChapterById(id: string) {
    try {
      let result: Chapter = await this.chapterRepository.findOne({
        where: {
          id: id,
        },
        relations: { images: true },
      });
      if (result) {
        result.images.sort((a, b) => a.order - b.order);
      }
      //console.log(result);

      return new ApiResponse(200, 'success', '', result);
    } catch (error) {
      console.log(error);
      return new ApiResponse(404, 'something wrong ', 'bad request');
    }
  }
}
