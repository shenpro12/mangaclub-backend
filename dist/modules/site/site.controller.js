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
exports.SiteController = void 0;
const common_1 = require("@nestjs/common");
const site_service_1 = require("./site.service");
let SiteController = class SiteController {
    constructor(siteService) {
        this.siteService = siteService;
    }
    async mangaByGenre(genreSlug, query, res) {
        const response = await this.siteService.getMangaByGenre(genreSlug, query);
        return res.status(response.status).json(response);
    }
    async searchManga(query, res) {
        const response = await this.siteService.searchManga(query);
        return res.status(response.status).json(response);
    }
    async allGenre(res) {
        const response = await this.siteService.findAllGenre();
        return res.status(response.status).json(response);
    }
};
__decorate([
    (0, common_1.Get)('manga-genre/:genreSlug'),
    __param(0, (0, common_1.Param)('genreSlug')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "mangaByGenre", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "searchManga", null);
__decorate([
    (0, common_1.Get)('genre'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "allGenre", null);
SiteController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [site_service_1.SiteService])
], SiteController);
exports.SiteController = SiteController;
//# sourceMappingURL=site.controller.js.map