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
exports.AccountController = void 0;
const common_1 = require("@nestjs/common");
const create_account_dto_1 = require("../../dto/create_account.dto");
const account_service_1 = require("./account.service");
const auth_signin_dto_1 = require("../../dto/auth_signin.dto");
const updateUserName_dto_1 = require("../../dto/updateUserName.dto");
const updateEmail_dto_1 = require("../../dto/updateEmail.dto");
const updatePassword_dto_1 = require("../../dto/updatePassword.dto");
const platform_express_1 = require("@nestjs/platform-express");
const resetPassword_dto_1 = require("../../dto/resetPassword.dto");
let AccountController = class AccountController {
    constructor(accountService) {
        this.accountService = accountService;
    }
    async updateAvatar(req, res, file) {
        let result = await this.accountService.updateAvatar(file, req['userId']);
        return res.status(result.status).json(result);
    }
    async updatePassword(body, req, res) {
        let result = await this.accountService.updatePassword(body.newPassword, body.comfirmPassword, body.currentPassword, req['userId']);
        return res.status(result.status).json(result);
    }
    async updateEmail(body, req, res) {
        let result = await this.accountService.updateEmail(body.newEmail, req['userId']);
        return res.status(result.status).json(result);
    }
    async updateUserName(body, req, res) {
        let result = await this.accountService.updateUserName(body.newUserName, req['userId']);
        return res.status(result.status).json(result);
    }
    async setRating(ratingData, req, res) {
        let result = await this.accountService.addRating(ratingData, req['userId']);
        return res.status(result.status).json(result);
    }
    async addBookmark(mangaId, req, res) {
        let result = await this.accountService.addBookmark(mangaId, req['userId']);
        return res.status(result.status).json(result);
    }
    async checkBookmark(mangaId, req, res) {
        let result = await this.accountService.checkBookmarkByManga(mangaId, req['userId']);
        return res.status(result.status).json(result);
    }
    async listDelete(bookmarksId, req, res) {
        let result = await this.accountService.deleteBookmarkByListId(bookmarksId, req['userId']);
        return res.status(result.status).json(result);
    }
    async deleteBookmark(bookmarkId, req, res) {
        let result = await this.accountService.deleteBookmarkById(bookmarkId, req['userId']);
        return res.status(result.status).json(result);
    }
    async refeshToken(req, res) {
        let newToken = await this.accountService.getNewAccessToken(req['userId'], req['token']);
        return res.status(newToken.status).json(newToken);
    }
    async getProfile(req, res) {
        let profile = await this.accountService.getUserProfile(req['userId']);
        return res.status(profile.status).json(profile);
    }
    async signup(body, res) {
        let createAccountStatus = await this.accountService.createAccount(body);
        return res.status(createAccountStatus.statusCode).json({
            message: createAccountStatus.message,
            status: createAccountStatus.status,
        });
    }
    async signin(body, res) {
        let signStatus = await this.accountService.signIn(body);
        if (signStatus.status) {
            return res.json({ status: true, user: signStatus.user });
        }
        else {
            return res.json({ status: false, message: signStatus.message });
        }
    }
    async bookmarks(req, res) {
        let result = await this.accountService.getUserBookmarks(req['userId']);
        return res.status(result.status).json(result);
    }
    async getNewPassword(body, res) {
        let result = await this.accountService.getNewPassword(body.email);
        return res.status(result.status).json(result);
    }
};
__decorate([
    (0, common_1.Post)('profile/avatar/update'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatarFile')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [new common_1.FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "updateAvatar", null);
__decorate([
    (0, common_1.Post)('profile/password/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updatePassword_dto_1.UpdatePasswordDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Post)('profile/email/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateEmail_dto_1.UpdateEmailDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "updateEmail", null);
__decorate([
    (0, common_1.Post)('profile/username/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateUserName_dto_1.UpdateUserNameDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "updateUserName", null);
__decorate([
    (0, common_1.Put)('manga/rating'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "setRating", null);
__decorate([
    (0, common_1.Put)('bookmark/add'),
    __param(0, (0, common_1.Body)('mangaId')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "addBookmark", null);
__decorate([
    (0, common_1.Post)('bookmark/isBookmark'),
    __param(0, (0, common_1.Body)('mangaId')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "checkBookmark", null);
__decorate([
    (0, common_1.Delete)('bookmark/listDelete'),
    __param(0, (0, common_1.Body)('bookmarksId')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "listDelete", null);
__decorate([
    (0, common_1.Delete)('bookmark/deleteOne'),
    __param(0, (0, common_1.Body)('bookmarkId')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "deleteBookmark", null);
__decorate([
    (0, common_1.Get)('token/refesh'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "refeshToken", null);
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_account_dto_1.CreateAccountDto, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_signin_dto_1.SignInDto, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "signin", null);
__decorate([
    (0, common_1.Get)('bookmarks'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "bookmarks", null);
__decorate([
    (0, common_1.Put)('newPassword'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resetPassword_dto_1.ResetPasswordDto, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getNewPassword", null);
AccountController = __decorate([
    (0, common_1.Controller)('account'),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], AccountController);
exports.AccountController = AccountController;
//# sourceMappingURL=account.controller.js.map