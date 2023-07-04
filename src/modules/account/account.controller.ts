import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  ParseFilePipe,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateAccountDto } from '../../dto/create_account.dto';
import { AccountService } from './account.service';
import { Request, Response } from 'express';
import { SignInDto } from '../../dto/auth_signin.dto';
import { UpdateUserNameDto } from '../../dto/updateUserName.dto';
import { UpdateEmailDto } from '../../dto/updateEmail.dto';
import { UpdatePasswordDto } from '../../dto/updatePassword.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResetPasswordDto } from '../../dto/resetPassword.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @Post('profile/avatar/update')
  @UseInterceptors(FileInterceptor('avatarFile'))
  async updateAvatar(
    @Req() req: Request,
    @Res() res: Response,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    let result = await this.accountService.updateAvatar(file, req['userId']);
    return res.status(result.status).json(result);
  }

  @Post('profile/password/update')
  async updatePassword(
    @Body() body: UpdatePasswordDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    let result = await this.accountService.updatePassword(
      body.newPassword,
      body.comfirmPassword,
      body.currentPassword,
      req['userId'],
    );
    return res.status(result.status).json(result);
  }

  @Post('profile/email/update')
  async updateEmail(
    @Body() body: UpdateEmailDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    let result = await this.accountService.updateEmail(
      body.newEmail,
      req['userId'],
    );
    return res.status(result.status).json(result);
  }

  @Post('profile/username/update')
  async updateUserName(
    @Body() body: UpdateUserNameDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    let result = await this.accountService.updateUserName(
      body.newUserName,
      req['userId'],
    );
    return res.status(result.status).json(result);
  }

  @Put('manga/rating')
  async setRating(
    @Body() ratingData: { mangaId: string; point: number },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    let result = await this.accountService.addRating(ratingData, req['userId']);
    return res.status(result.status).json(result);
  }

  @Put('bookmark/add')
  async addBookmark(
    @Body('mangaId') mangaId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    let result = await this.accountService.addBookmark(mangaId, req['userId']);
    return res.status(result.status).json(result);
  }

  @Post('bookmark/isBookmark')
  async checkBookmark(
    @Body('mangaId') mangaId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    let result = await this.accountService.checkBookmarkByManga(
      mangaId,
      req['userId'],
    );
    return res.status(result.status).json(result);
  }

  @Delete('bookmark/listDelete')
  async listDelete(
    @Body('bookmarksId') bookmarksId: Array<string>,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    let result = await this.accountService.deleteBookmarkByListId(
      bookmarksId,
      req['userId'],
    );
    return res.status(result.status).json(result);
  }

  @Delete('bookmark/deleteOne')
  async deleteBookmark(
    @Body('bookmarkId') bookmarkId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    let result = await this.accountService.deleteBookmarkById(
      bookmarkId,
      req['userId'],
    );
    return res.status(result.status).json(result);
  }

  @Get('token/refesh')
  async refeshToken(@Req() req: Request, @Res() res: Response) {
    let newToken = await this.accountService.getNewAccessToken(
      req['userId'],
      req['token'],
    );
    return res.status(newToken.status).json(newToken);
  }

  @Get('profile')
  async getProfile(@Req() req: Request, @Res() res: Response) {
    let profile = await this.accountService.getUserProfile(req['userId']);
    return res.status(profile.status).json(profile);
  }

  @Post('signup')
  async signup(@Body() body: CreateAccountDto, @Res() res: Response) {
    let createAccountStatus: any = await this.accountService.createAccount(
      body,
    );
    return res.status(createAccountStatus.statusCode).json({
      message: createAccountStatus.message,
      status: createAccountStatus.status,
    });
  }

  @Post('signin')
  async signin(@Body() body: SignInDto, @Res() res: Response) {
    let signStatus: any = await this.accountService.signIn(body);
    if (signStatus.status) {
      return res.json({ status: true, user: signStatus.user });
    } else {
      return res.json({ status: false, message: signStatus.message });
    }
  }

  @Get('bookmarks')
  async bookmarks(@Req() req: Request, @Res() res: Response) {
    let result = await this.accountService.getUserBookmarks(req['userId']);
    return res.status(result.status).json(result);
  }

  @Put('newPassword')
  async getNewPassword(@Body() body: ResetPasswordDto, @Res() res: Response) {
    let result = await this.accountService.getNewPassword(body.email);
    return res.status(result.status).json(result);
  }
}
