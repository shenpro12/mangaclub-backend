/// <reference types="multer" />
import { Repository } from 'typeorm';
import { CreateAccountDto } from 'src/dto/create_account.dto';
import { Account } from 'src/entities/account.entity';
import { SignInDto } from 'src/dto/auth_signin.dto';
import { RefeshToken } from 'src/entities/user_refeshtoken.entity';
import { ApiResponse } from 'src/classes';
import { Bookmark } from 'src/entities/bookmark.entity';
import { Manga } from 'src/entities/manga.entity';
import { Rating } from 'src/entities/rating.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class AccountService {
    private readonly accountRepository;
    private readonly refeshTokenRepository;
    private readonly bookmarkRepository;
    private readonly mangaRepository;
    private readonly ratingRepository;
    private readonly cloudinaryService;
    constructor(accountRepository: Repository<Account>, refeshTokenRepository: Repository<RefeshToken>, bookmarkRepository: Repository<Bookmark>, mangaRepository: Repository<Manga>, ratingRepository: Repository<Rating>, cloudinaryService: CloudinaryService);
    createAccount(accountInfo: CreateAccountDto): Promise<{
        statusCode: number;
        message: string;
        status: boolean;
    }>;
    signIn(signInInfo: SignInDto): Promise<{
        message: string;
        status: boolean;
        user?: undefined;
    } | {
        status: boolean;
        user: {
            id: string;
            userName: string;
            email: string;
            avatar: string;
            isAdmin: boolean;
            accessToken: string;
            refeshToken: string;
        };
        message?: undefined;
    }>;
    getUserProfile(userId: string): Promise<ApiResponse>;
    getNewAccessToken(userId: string, rftk: string): Promise<ApiResponse>;
    deleteBookmarkById(bookmarkId: string, userId: string): Promise<ApiResponse>;
    deleteBookmarkByListId(bookmarksId: Array<string>, userId: string): Promise<ApiResponse>;
    addBookmark(mangaId: string, userId: string): Promise<ApiResponse>;
    checkBookmarkByManga(mangaId: string, userId: string): Promise<ApiResponse>;
    addRating(ratingData: {
        mangaId: string;
        point: number;
    }, userId: string): Promise<ApiResponse>;
    getUserBookmarks(userId: string): Promise<ApiResponse>;
    updateUserName(newUserName: string, userId: string): Promise<ApiResponse>;
    updateEmail(newEmail: string, userId: string): Promise<ApiResponse>;
    updatePassword(newPassword: string, comfirmPassword: string, currentPassword: string, userId: string): Promise<ApiResponse>;
    updateAvatar(file: Express.Multer.File, userId: string): Promise<ApiResponse>;
    getNewPassword(email: string): Promise<ApiResponse>;
}
