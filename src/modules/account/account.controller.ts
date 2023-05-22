import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateAccountDto } from 'src/dto/create_account.dto';
import { AccountService } from './account.service';
import { Response } from 'express';
import { SignInDto } from 'src/dto/auth_signin.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

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
