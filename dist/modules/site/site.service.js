"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_validator_1 = require("class-validator");
const classes_1 = require("../../classes");
const constant_1 = require("../../constant");
const category_entity_1 = require("../../entities/category.entity");
const manga_entity_1 = require("../../entities/manga.entity");
const getPages_1 = require("../../util/getPages");
const sort_1 = require("../../util/sort");
const typeorm_2 = require("typeorm");
let SiteService = class SiteService {
    constructor(categoryRepository, mangaRepository) {
        this.categoryRepository = categoryRepository;
        this.mangaRepository = mangaRepository;
    }
    async findAllGenre() {
        try {
            let genres = await this.categoryRepository.find({
                relations: { manga: true },
            });
            for (let i = 0; i < genres.length; i++) {
                genres[i].manga = genres[i].manga.length;
            }
            genres.sort((a, b) => {
                let a_charCode = a.name.toLowerCase().slice(0, 1).charCodeAt();
                let b_charCode = b.name.toLowerCase().slice(0, 1).charCodeAt();
                return a_charCode - b_charCode;
            });
            return new classes_1.ApiResponse(200, 'success', '', genres);
        }
        catch (error) {
            console.log(error);
            return new classes_1.ApiResponse(404, 'songthing went wrong', 'bad request');
        }
    }
    async getMangaByGenre(genre, query) {
        try {
            let result = await this.categoryRepository.findOne({
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
            let mangaList = [];
            let pages = [];
            let totalItem;
            let maxPage;
            let currPage;
            if (result) {
                mangaList = result.manga;
                totalItem = mangaList.length;
                maxPage = Math.ceil(mangaList.length / constant_1.PAGE_SIZE);
                currPage = query.page
                    ? (0, class_validator_1.isNumberString)(query.page)
                        ? parseInt(query.page)
                        : 1
                    : 1;
                if (query.sort) {
                    mangaList = (0, sort_1.mangaSort)(mangaList, query.sort);
                }
                else {
                    mangaList = (0, sort_1.mangaSort)(mangaList);
                }
                if (mangaList.length && query.paging !== 'none') {
                    mangaList = mangaList.slice(constant_1.PAGE_SIZE * currPage - constant_1.PAGE_SIZE, constant_1.PAGE_SIZE * currPage);
                    if (mangaList.length) {
                        pages = (0, getPages_1.getPages)(maxPage, currPage);
                    }
                }
            }
            for (let i = 0; i < mangaList.length; i++) {
                mangaList[i].chapters.sort((a, b) => b.order - a.order);
            }
            return new classes_1.ApiResponse(200, 'success', '', {
                mangaList,
                page: currPage,
                pages,
                totalItem,
                maxPage,
            });
        }
        catch (error) {
            console.log(error);
            return new classes_1.ApiResponse(404, 'songthing went wrong', 'bad request');
        }
    }
    async searchManga(query) {
        try {
            let findOption = {};
            if (query.keyword) {
                findOption['name'] = (0, typeorm_2.Like)(`%${query.keyword}%`);
            }
            if (query.author) {
                findOption['author'] = (0, typeorm_2.Like)(`%${query.author}%`);
            }
            if (query.status) {
                findOption['status'] =
                    query.status === 'ongoing'
                        ? false
                        : query.status === 'completed'
                            ? true
                            : (0, typeorm_2.In)([true, false]);
            }
            if (query.genre) {
                if (typeof query.genre === 'string') {
                    findOption['categories'] = { name: query.genre };
                }
                if (typeof query.genre === 'object') {
                    findOption['categories'] = { name: (0, typeorm_2.In)(query.genre) };
                }
            }
            let mangaList = await this.mangaRepository.find({
                where: findOption,
                relations: { ratings: true, chapters: true },
            });
            let pages = [];
            let totalItem;
            let maxPage;
            let currPage;
            if (mangaList) {
                totalItem = mangaList.length;
                maxPage = Math.ceil(mangaList.length / constant_1.PAGE_SIZE);
                currPage = query.page
                    ? (0, class_validator_1.isNumberString)(query.page)
                        ? parseInt(query.page)
                        : 1
                    : 1;
                if (query.sort) {
                    mangaList = (0, sort_1.mangaSort)(mangaList, query.sort);
                }
                else {
                    mangaList = (0, sort_1.mangaSort)(mangaList);
                }
                if (mangaList.length && query.paging !== 'none') {
                    mangaList = mangaList.slice(constant_1.PAGE_SIZE * currPage - constant_1.PAGE_SIZE, constant_1.PAGE_SIZE * currPage);
                    if (mangaList.length) {
                        pages = (0, getPages_1.getPages)(maxPage, currPage);
                    }
                }
            }
            for (let i = 0; i < mangaList.length; i++) {
                mangaList[i].chapters.sort((a, b) => b.order - a.order);
            }
            return new classes_1.ApiResponse(200, 'success', '', {
                mangaList,
                page: currPage,
                pages,
                totalItem,
                maxPage,
            });
        }
        catch (error) {
            console.log(error);
            return new classes_1.ApiResponse(404, 'songthing went wrong', 'bad request');
        }
    }
};
SiteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(1, (0, typeorm_1.InjectRepository)(manga_entity_1.Manga)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SiteService);
exports.SiteService = SiteService;
//# sourceMappingURL=site.service.js.map