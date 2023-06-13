import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { CreateAccountDto } from 'src/dto/create_account.dto';
import { AccountService } from './account.service';
import { Request, Response } from 'express';
import { SignInDto } from 'src/dto/auth_signin.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @Post('bookmark/listDelete')
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

  @Post('bookmark/deleteOne')
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
}
