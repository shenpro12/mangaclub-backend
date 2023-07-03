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
exports.MangaController = void 0;
const common_1 = require("@nestjs/common");
const manga_service_1 = require("./manga.service");
let MangaController = class MangaController {
    constructor(mangaService) {
        this.mangaService = mangaService;
    }
    async getChapterById(id, res) {
        const response = await this.mangaService.findChapterById(id);
        return res.status(response.status).json(response);
    }
    async getMangaByid(id, res) {
        const response = await this.mangaService.findMangaById(id);
        return res.status(response.status).json(response);
    }
    async getRelatedManga(query, res) {
        const response = await this.mangaService.getRelatedManga(query.genre, query.limit);
        return res.status(response.status).json(response);
    }
    async manga(slug, res) {
        const response = await this.mangaService.findManga(slug);
        return res.status(response.status).json(response);
    }
    async allManga(query, res) {
        const response = await this.mangaService.findAllManga(query);
        return res.status(response.status).json(response);
    }
};
__decorate([
    (0, common_1.Get)('chapter/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "getChapterById", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "getMangaByid", null);
__decorate([
    (0, common_1.Get)('related'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "getRelatedManga", null);
__decorate([
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "manga", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MangaController.prototype, "allManga", null);
MangaController = __decorate([
    (0, common_1.Controller)('manga'),
    __metadata("design:paramtypes", [manga_service_1.MangaService])
], MangaController);
exports.MangaController = MangaController;
//# sourceMappingURL=manga.controller.js.map