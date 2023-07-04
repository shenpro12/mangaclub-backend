/// <reference types="multer" />
import { CreateAccountDto } from '../../dto/create_account.dto';
import { AccountService } from './account.service';
import { Request, Response } from 'express';
import { SignInDto } from '../../dto/auth_signin.dto';
import { UpdateUserNameDto } from '../../dto/updateUserName.dto';
import { UpdateEmailDto } from '../../dto/updateEmail.dto';
import { UpdatePasswordDto } from '../../dto/updatePassword.dto';
import { ResetPasswordDto } from '../../dto/resetPassword.dto';
export declare class AccountController {
    private readonly accountService;
    constructor(accountService: AccountService);
    updateAvatar(req: Request, res: Response, file: Express.Multer.File): Promise<Response<any, Record<string, any>>>;
    updatePassword(body: UpdatePasswordDto, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateEmail(body: UpdateEmailDto, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateUserName(body: UpdateUserNameDto, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    setRating(ratingData: {
        mangaId: string;
        point: number;
    }, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    addBookmark(mangaId: string, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    checkBookmark(mangaId: string, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    listDelete(bookmarksId: Array<string>, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteBookmark(bookmarkId: string, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    refeshToken(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    signup(body: CreateAccountDto, res: Response): Promise<Response<any, Record<string, any>>>;
    signin(body: SignInDto, res: Response): Promise<Response<any, Record<string, any>>>;
    bookmarks(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getNewPassword(body: ResetPasswordDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
