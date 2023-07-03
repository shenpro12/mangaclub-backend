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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookmark = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base/base.entity");
const account_entity_1 = require("./account.entity");
const manga_entity_1 = require("./manga.entity");
let Bookmark = class Bookmark extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Bookmark.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => manga_entity_1.Manga, (manga) => manga.bookmarks),
    __metadata("design:type", manga_entity_1.Manga)
], Bookmark.prototype, "manga", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_entity_1.Account, (account) => account.bookmarks),
    __metadata("design:type", account_entity_1.Account)
], Bookmark.prototype, "account", void 0);
Bookmark = __decorate([
    (0, typeorm_1.Entity)()
], Bookmark);
exports.Bookmark = Bookmark;
//# sourceMappingURL=bookmark.entity.js.map