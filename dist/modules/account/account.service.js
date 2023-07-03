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
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require('bcrypt');
const account_entity_1 = require("../../entities/account.entity");
const jwt_helper_1 = require("../../helper/jwt.helper");
const user_refeshtoken_entity_1 = require("../../entities/user_refeshtoken.entity");
const classes_1 = require("../../classes");
const bookmark_entity_1 = require("../../entities/bookmark.entity");
const manga_entity_1 = require("../../entities/manga.entity");
const rating_entity_1 = require("../../entities/rating.entity");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const nodeMailer = require('nodemailer');
let AccountService = class AccountService {
    constructor(accountRepository, refeshTokenRepository, bookmarkRepository, mangaRepository, ratingRepository, cloudinaryService) {
        this.accountRepository = accountRepository;
        this.refeshTokenRepository = refeshTokenRepository;
        this.bookmarkRepository = bookmarkRepository;
        this.mangaRepository = mangaRepository;
        this.ratingRepository = ratingRepository;
        this.cloudinaryService = cloudinaryService;
    }
    async createAccount(accountInfo) {
        try {
            let user = await this.accountRepository.findOne({
                where: [
                    { userName: accountInfo.userName },
                    { email: accountInfo.email },
                ],
            });
            if (user && user.userName === accountInfo.userName) {
                return {
                    statusCode: 400,
                    message: 'UserName is already used.',
                    status: false,
                };
            }
            else if (user && user.email === accountInfo.email) {
                return {
                    statusCode: 400,
                    message: 'Email is already used.',
                    status: false,
                };
            }
            else {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(accountInfo.password, salt);
                let account = new account_entity_1.Account();
                account.avatar =
                    'https://res.cloudinary.com/ds77nzv6d/image/upload/v1684208953/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail_ujx3ox.png';
                account.email = accountInfo.email;
                account.userName = accountInfo.userName;
                account.password = hash;
                account.isAdmin = false;
                await this.accountRepository.save(account);
                return {
                    statusCode: 200,
                    message: 'Registration successfully! You can login now.',
                    status: true,
                };
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async signIn(signInInfo) {
        try {
            let user = await this.accountRepository.findOne({
                where: [
                    { userName: signInInfo.userNameOrEmail },
                    { email: signInInfo.userNameOrEmail },
                ],
            });
            if (!user) {
                return {
                    message: 'Account does not exist.',
                    status: false,
                };
            }
            if (bcrypt.compareSync(signInInfo.password, user.password)) {
                let accessToken = await (0, jwt_helper_1.generateToken)(user, process.env.TOKEN_SECRET, process.env.ACCESS_TOKELIFE);
                let refeshToken = await (0, jwt_helper_1.generateToken)(user, process.env.TOKEN_SECRET, process.env.REFESH_TOKENLIFE);
                let rftk = new user_refeshtoken_entity_1.RefeshToken();
                rftk.token = refeshToken;
                rftk.userId = user.id;
                await this.refeshTokenRepository.save(rftk);
                return {
                    status: true,
                    user: {
                        id: user.id,
                        userName: user.userName,
                        email: user.email,
                        avatar: user.avatar,
                        isAdmin: user.isAdmin,
                        accessToken,
                        refeshToken,
                    },
                };
            }
            else {
                return {
                    message: 'Wrong password.',
                    status: false,
                };
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async getUserProfile(userId) {
        try {
            const userProfile = await this.accountRepository.findOne({
                select: {
                    id: true,
                    userName: true,
                    avatar: true,
                    email: true,
                    isAdmin: true,
                },
                where: { id: userId },
            });
            return new classes_1.ApiResponse(200, 'success', '', userProfile);
        }
        catch (error) {
            console.log(error);
            return new classes_1.ApiResponse(404, 'somtthing wrong', 'bad request');
        }
    }
    async getNewAccessToken(userId, rftk) {
        try {
            let result = await this.refeshTokenRepository.findOne({
                where: {
                    userId: userId,
                    token: rftk,
                },
            });
            if (result) {
                let user = await this.accountRepository.findOne({
                    where: { id: userId },
                });
                let accessToken = await (0, jwt_helper_1.generateToken)(user, process.env.TOKEN_SECRET, process.env.ACCESS_TOKELIFE);
                return new classes_1.ApiResponse(200, 'success', '', accessToken);
            }
            else {
                return new classes_1.ApiResponse(401, 'token expired', 'bad request');
            }
        }
        catch (error) {
            console.log(error);
            return new classes_1.ApiResponse(404, 'somtthing wrong', 'bad request');
        }
    }
    async deleteBookmarkById(bookmarkId, userId) {
        try {
            let user = await this.accountRepository.findOne({
                where: { id: userId },
                relations: {
                    bookmarks: true,
                },
            });
            let bookmark = user.bookmarks.find((i) => i.id === bookmarkId);
            if (bookmark) {
                let result = await this.bookmarkRepository.softRemove(bookmark);
                return new classes_1.ApiResponse(200, 'delete success', '', result);
            }
            else {
                return new classes_1.ApiResponse(404, 'not found', 'bad request');
            }
        }
        catch (error) {
            console.log(error);
            return new classes_1.ApiResponse(404, 'somtthing wrong', 'bad request');
        }
    }
    async deleteBookmarkByListId(bookmarksId, userId) {
        try {
            let user = await this.accountRepository.findOne({
                where: { id: userId },
                relations: {
                    bookmarks: true,
                },
            });
            let bookmarks = [];
            for (let j = 0; j < bookmarksId.length; j++) {
                let temp = user.bookmarks.find((i) => i.id === bookmarksId[j]);
                if (temp) {
                    bookmarks.push(temp);
                }
            }
            if (bookmarks) {
                let result = await this.bookmarkRepository.softRemove(bookmarks);
                return new classes_1.ApiResponse(200, 'delete success', '', result);
            }
            else {
                return new classes_1.ApiResponse(404, 'not found', 'bad request');
            }
        }
        catch (error) {
            console.log(error);
            return new classes_1.ApiResponse(404, 'somtthing wrong', 'bad request');
        }
    }
    async addBookmark(mangaId, userId) {
        try {
            let bookmark = await this.bookmarkRepository.findOne({
                where: { manga: { id: mangaId }, account: { id: userId } },
                withDeleted: true,
            });
            let response;
            if (bookmark && bookmark.deleteAt) {
                response = await this.bookmarkRepository.recover(bookmark);
            }
            if (!bookmark) {
                let newBookmark = new bookmark_entity_1.Bookmark();
                let [user, manga] = await Promise.all([
                    this.accountRepository.findOne({
                        where: { id: userId },
                    }),
                    this.mangaRepository.findOne({
                        where: { id: mangaId },
                    }),
                ]);
                newBookmark.account = user;
                newBookmark.manga = manga;
                response = await this.bookmarkRepository.save(newBookmark);
            }
            delete response.account;
            delete response.manga;
            return new classes_1.ApiResponse(200, '', '', response);
        }
        catch (error) {
            console.log(error);
            return new classes_1.ApiResponse(404, 'somtthing wrong', 'bad request');
        }
    }
    async checkBookmarkByManga(mangaId, userId) {
        try {
            let bookmarks = await this.bookmarkRepository.findOne({
                where: { manga: { id: mangaId }, account: { id: userId } },
            });
            return new classes_1.ApiResponse(200, 'success', '', {
                isBookmark: bookmarks ? true : false,
                bookmarkId: bookmarks ? bookmarks.id : '',
            });
        }
        catch (error) {
            console.log(error);
            return new classes_1.ApiResponse(404, 'somtthing wrong', 'bad request');
        }
    }
    async addRating(ratingData, userId) {
        try {
            let rating = await this.ratingRepository.findOne({
                where: { manga: { id: ratingData.mangaId }, account: { id: userId } },
            });
            let response;
            if (rating) {
                rating.point = ratingData.point;
                response = await this.ratingRepository.save(rating);
            }
            else {
                let newRating = new rating_entity_1.Rating();
                newRating.point = ratingData.point;
                let [user, manga] = await Promise.all([
                    this.accountRepository.findOne({
                        where: { id: userId },
                    }),
                    this.mangaRepository.findOne({
                        where: { id: ratingData.mangaId },
                    }),
                ]);
                newRating.account = user;
                newRating.manga = manga;
                response = await this.ratingRepository.save(newRating);
            }
            delete response.account;
            delete response.manga;
            return new classes_1.ApiResponse(200, 'success', '', response);
        }
        catch (error) {
            console.log(error);
            return new classes_1.ApiResponse(404, 'somtthing wrong', 'bad request');
        }
    }
    async getUserBookmarks(userId) {
        try {
            let bookmarks = await this.bookmarkRepository.find({
                where: { account: { id: userId } },
                relations: { manga: { chapters: true, ratings: true } },
            });
            bookmarks = bookmarks.sort((a, b) => Date.parse(b.updatedAt.toString()) -
                Date.parse(a.updatedAt.toString()));
            if (bookmarks) {
                return new classes_1.ApiResponse(200, 'success', '', bookmarks);
            }
            else {
                return new classes_1.ApiResponse(200, 'success', '', []);
            }
        }
        catch (error) {
            console.log(error);
            return new classes_1.ApiResponse(404, 'somtthing wrong', 'bad request');
        }
    }
    async updateUserName(newUserName, userId) {
        try {
            let isExistUserName = await this.accountRepository.findOne({
                where: { userName: `${newUserName}` },
            });
            if (isExistUserName) {
                return new classes_1.ApiResponse(200, 'userName already exist!', '');
            }
            let user = await this.accountRepository.findOne({
                where: { id: userId },
            });
            user.userName = `${newUserName}`;
            await this.accountRepository.save(user);
            return new classes_1.ApiResponse(200, 'Change userName success!', '', {
                newUserName,
            });
        }
        catch (error) {
            console.log(error);
            return new classes_1.ApiResponse(404, 'somtthing wrong', 'bad request');
        }
    }
    async updateEmail(newEmail, userId) {
        try {
            let isExistEmail = await this.accountRepository.findOne({
                where: { email: `${newEmail}` },
            });
            if (isExistEmail) {
                return new classes_1.ApiResponse(200, 'Email already exist!', '');
            }
            let user = await this.accountRepository.findOne({
                where: { id: userId },
            });
            user.email = `${newEmail}`;
            await this.accountRepository.save(user);
            return new classes_1.ApiResponse(200, 'Change userName success!', '', {
                newEmail,
            });
        }
        catch (error) {
            console.log(error);
            return new classes_1.ApiResponse(404, 'somtthing wrong', 'bad request');
        }
    }
    async updatePassword(newPassword, comfirmPassword, currentPassword, userId) {
        try {
            let user = await this.accountRepository.findOne({
                where: { id: userId },
            });
            if (user &&
                bcrypt.compareSync(currentPassword, user.password) &&
                newPassword === comfirmPassword) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(newPassword, salt);
                user.password = hash;
                await this.accountRepository.save(user);
                return new classes_1.ApiResponse(200, 'Change password success!', '', {
                    isPasswordChanged: true,
                });
            }
            else if (newPassword !== comfirmPassword ||
                !bcrypt.compareSync(currentPassword, user.password)) {
                return new classes_1.ApiResponse(200, 'password incorrect', '', {
                    isPasswordChanged: false,
                });
            }
            else {
                return new classes_1.ApiResponse(200, 'User not exist!', '', {
                    isPasswordChanged: false,
                });
            }
        }
        catch (error) {
            console.log(error);
            return new classes_1.ApiResponse(404, 'somtthing wrong', 'bad request');
        }
    }
    async updateAvatar(file, userId) {
        try {
            let user = await this.accountRepository.findOne({
                where: {
                    id: userId,
                },
            });
            await this.cloudinaryService.deleteImage(user.avatar);
            let newAvatar = await this.cloudinaryService.uploadFile(file);
            user.avatar = newAvatar.url;
            await this.accountRepository.save(user);
            return new classes_1.ApiResponse(200, 'update success!', '', {
                newAvatarUrl: newAvatar.url,
            });
        }
        catch (error) {
            console.log(error);
            return new classes_1.ApiResponse(404, 'somtthing wrong', 'bad request');
        }
    }
    async getNewPassword(email) {
        try {
            let user = await this.accountRepository.findOne({
                where: { email },
            });
            if (!user) {
                return new classes_1.ApiResponse(200, 'Email is not exist!', '');
            }
            let newPassword = Math.random().toString(36);
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(newPassword, salt);
            user.password = hash;
            await this.accountRepository.save(user);
            let transporter = nodeMailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });
            let mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Cập nhật mật khẩu tài khoản MangaClub',
                html: `<div><p>Your new password: <spand>${newPassword}</spand></p><p>Please change your password to protect your account!</p></div>`,
            };
            await transporter.sendMail(mailOptions);
            return new classes_1.ApiResponse(200, 'New Password is send to your Email!', '');
        }
        catch (error) {
            console.log(error);
            return new classes_1.ApiResponse(404, 'somtthing wrong', 'bad request');
        }
    }
};
AccountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_entity_1.Account)),
    __param(1, (0, typeorm_1.InjectRepository)(user_refeshtoken_entity_1.RefeshToken)),
    __param(2, (0, typeorm_1.InjectRepository)(bookmark_entity_1.Bookmark)),
    __param(3, (0, typeorm_1.InjectRepository)(manga_entity_1.Manga)),
    __param(4, (0, typeorm_1.InjectRepository)(rating_entity_1.Rating)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        cloudinary_service_1.CloudinaryService])
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map