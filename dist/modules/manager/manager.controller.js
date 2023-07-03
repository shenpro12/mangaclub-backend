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
exports.ManagerController = void 0;
const common_1 = require("@nestjs/common");
const create_manga_dto_1 = require("../../dto/create_manga.dto");
const manager_service_1 = require("./manager.service");
const platform_express_1 = require("@nestjs/platform-express");
const create_category_dto_1 = require("../../dto/create_category.dto");
let ManagerController = class ManagerController {
    constructor(managerService) {
        this.managerService = managerService;
    }
    createManga(body, file) {
        return this.managerService.createManga(body, file);
    }
    createCategory(body) {
        return this.managerService.createCategory(body);
    }
};
__decorate([
    (0, common_1.Post)('manga/create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('thumb_url')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [new common_1.FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_manga_dto_1.CreateMangaDto, Object]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "createManga", null);
__decorate([
    (0, common_1.Post)('category/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", void 0)
], ManagerController.prototype, "createCategory", null);
ManagerController = __decorate([
    (0, common_1.Controller)('manager'),
    __metadata("design:paramtypes", [manager_service_1.ManagerService])
], ManagerController);
exports.ManagerController = ManagerController;
//# sourceMappingURL=manager.controller.js.map