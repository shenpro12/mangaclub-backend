"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModule = void 0;
const common_1 = require("@nestjs/common");
const account_controller_1 = require("./account.controller");
const account_service_1 = require("./account.service");
const typeorm_1 = require("@nestjs/typeorm");
const account_entity_1 = require("../../entities/account.entity");
const user_refeshtoken_entity_1 = require("../../entities/user_refeshtoken.entity");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const bookmark_entity_1 = require("../../entities/bookmark.entity");
const manga_entity_1 = require("../../entities/manga.entity");
const rating_entity_1 = require("../../entities/rating.entity");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
let AccountModule = class AccountModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.Auth).forRoutes({ path: 'account/profile', method: common_1.RequestMethod.GET }, { path: 'account/bookmarks', method: common_1.RequestMethod.GET }, { path: 'account/token/refesh', method: common_1.RequestMethod.GET }, { path: 'account/bookmark/add', method: common_1.RequestMethod.PUT }, { path: 'account/bookmark/isBookmark', method: common_1.RequestMethod.POST }, { path: 'account/bookmark/deleteOne', method: common_1.RequestMethod.DELETE }, { path: 'account/bookmark/listDelete', method: common_1.RequestMethod.DELETE }, { path: 'account/manga/rating', method: common_1.RequestMethod.PUT }, {
            path: 'account/profile/username/update',
            method: common_1.RequestMethod.POST,
        }, {
            path: 'account/profile/email/update',
            method: common_1.RequestMethod.POST,
        }, {
            path: 'account/profile/pasword/update',
            method: common_1.RequestMethod.POST,
        }, {
            path: 'account/profile/avatar/update',
            method: common_1.RequestMethod.POST,
        });
    }
};
AccountModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([account_entity_1.Account, user_refeshtoken_entity_1.RefeshToken, bookmark_entity_1.Bookmark, manga_entity_1.Manga, rating_entity_1.Rating]),
            cloudinary_module_1.CloudinaryModule,
        ],
        controllers: [account_controller_1.AccountController],
        providers: [account_service_1.AccountService],
    })
], AccountModule);
exports.AccountModule = AccountModule;
//# sourceMappingURL=account.module.js.map