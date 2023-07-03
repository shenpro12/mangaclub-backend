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
exports.MangaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_validator_1 = require("class-validator");
const classes_1 = require("../../classes");
const constant_1 = require("../../constant");
const chapter_entity_1 = require("../../entities/chapter.entity");
const manga_entity_1 = require("../../entities/manga.entity");
const getPages_1 = require("../../util/getPages");
const sort_1 = require("../../util/sort");
const typeorm_2 = require("typeorm");
let MangaService = class MangaService {
    constructor(mangaRepository, chapterRepository) {
        this.mangaRepository = mangaRepository;
        this.chapterRepository = chapterRepository;
    }
    async findAllManga(query) {
        try {
            let mangaList = await this.mangaRepository.find({
                relations: {
                    ratings: true,
                    chapters: true,
                },
            });
            let pages = [];
            let totalItem = mangaList.length;
            let maxPage = Math.ceil(mangaList.length / constant_1.PAGE_SIZE);
            let currPage = query.page
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
            return new classes_1.ApiResponse(404, 'something wrong ', 'bad request');
        }
    }
    async findManga(slug) {
        try {
            let result = await this.mangaRepository.findOne({
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
            result.bookmarks = result.bookmarks.map((i) => (Object.assign(Object.assign({}, i), { account: Object.assign(Object.assign({}, i.account), { password: null, createdAt: null, updatedAt: null, deleteAt: null, isAdmin: null, email: null, userName: null, avatar: null }) })));
            return new classes_1.ApiResponse(200, 'success', '', result);
        }
        catch (error) {
            console.log(error);
            return new classes_1.ApiResponse(404, 'something wrong ', 'bad request');
        }
    }
    async findMangaById(id) {
        try {
            let result = await this.mangaRepository.findOne({
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
            return new classes_1.ApiResponse(200, 'success', '', result);
        }
        catch (error) {
            console.log(error);
            return new classes_1.ApiResponse(404, 'something wrong ', 'bad request');
        }
    }
    async getRelatedManga(genres, limit) {
        try {
            let manga = await this.mangaRepository.find({
                where: { categories: { name: (0, typeorm_2.In)(genres ? genres : []) } },
                take: limit,
            });
            return new classes_1.ApiResponse(200, 'success', '', { mangaList: manga });
        }
        catch (error) {
            console.log(error);
            return new classes_1.ApiResponse(404, 'songthing went wrong', 'bad request');
        }
    }
    async findChapterById(id) {
        try {
            let result = await this.chapterRepository.findOne({
                where: {
                    id: id,
                },
                relations: { images: true },
            });
            if (result) {
                result.images.sort((a, b) => a.order - b.order);
            }
            return new classes_1.ApiResponse(200, 'success', '', result);
        }
        catch (error) {
            console.log(error);
            return new classes_1.ApiResponse(404, 'something wrong ', 'bad request');
        }
    }
};
MangaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(manga_entity_1.Manga)),
    __param(1, (0, typeorm_1.InjectRepository)(chapter_entity_1.Chapter)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MangaService);
exports.MangaService = MangaService;
//# sourceMappingURL=manga.service.js.map