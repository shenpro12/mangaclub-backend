import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
const bcrypt = require('bcrypt');
import { CreateAccountDto } from 'src/dto/create_account.dto';
import { Account } from 'src/entities/account.entity';
import { SignInDto } from 'src/dto/auth_signin.dto';
import { generateToken } from 'src/helper/jwt.helper';
import { RefeshToken } from 'src/entities/user_refeshtoken.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(RefeshToken)
    private readonly refeshTokenRepository: Repository<RefeshToken>,
  ) {}
  async createAccount(accountInfo: CreateAccountDto) {
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
      } else if (user && user.email === accountInfo.email) {
        return {
          statusCode: 400,
          message: 'Email is already used.',
          status: false,
        };
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(accountInfo.password, salt);
        let account = new Account();
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
    } catch (err) {
      console.log(err);
    }
  }

  async signIn(signInInfo: SignInDto) {
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
        let accessToken = await generateToken(
          user,
          process.env.TOKEN_SECRET,
          process.env.ACCESS_TOKELIFE,
        );
        let refeshToken = await generateToken(
          user,
          process.env.TOKEN_SECRET,
          process.env.REFESH_TOKENLIFE,
        );
        let rftk = new RefeshToken();
        rftk.token = refeshToken;
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
      } else {
        return {
          message: 'Wrong password.',
          status: false,
        };
      }
    } catch (err) {
      console.log(err);
    }
  }
}
