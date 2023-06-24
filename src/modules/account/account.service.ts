import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
const bcrypt = require('bcrypt');
import { CreateAccountDto } from 'src/dto/create_account.dto';
import { Account } from 'src/entities/account.entity';
import { SignInDto } from 'src/dto/auth_signin.dto';
import { generateToken } from 'src/helper/jwt.helper';
import { RefeshToken } from 'src/entities/user_refeshtoken.entity';
import { ApiResponse } from 'src/classes';
import { Bookmark } from 'src/entities/bookmark.entity';
import { Manga } from 'src/entities/manga.entity';
import { Rating } from 'src/entities/rating.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ResetPasswordDto } from 'src/dto/resetPassword.dto';
const nodeMailer = require('nodemailer');

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(RefeshToken)
    private readonly refeshTokenRepository: Repository<RefeshToken>,
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
    @InjectRepository(Manga)
    private readonly mangaRepository: Repository<Manga>,
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    private readonly cloudinaryService: CloudinaryService,
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

  async getUserProfile(userId: string) {
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
      return new ApiResponse(200, 'success', '', userProfile);
    } catch (error) {
      console.log(error);
      return new ApiResponse(404, 'somtthing wrong', 'bad request');
    }
  }

  async getNewAccessToken(userId: string, rftk: string) {
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
        let accessToken = await generateToken(
          user,
          process.env.TOKEN_SECRET,
          process.env.ACCESS_TOKELIFE,
        );
        return new ApiResponse(200, 'success', '', accessToken);
      } else {
        return new ApiResponse(401, 'token expired', 'bad request');
      }
    } catch (error) {
      console.log(error);
      return new ApiResponse(404, 'somtthing wrong', 'bad request');
    }
  }

  async deleteBookmarkById(bookmarkId: string, userId: string) {
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
        return new ApiResponse(200, 'delete success', '', result);
      } else {
        return new ApiResponse(404, 'not found', 'bad request');
      }
    } catch (error) {
      console.log(error);
      return new ApiResponse(404, 'somtthing wrong', 'bad request');
    }
  }

  async deleteBookmarkByListId(bookmarksId: Array<string>, userId: string) {
    try {
      let user = await this.accountRepository.findOne({
        where: { id: userId },
        relations: {
          bookmarks: true,
        },
      });
      let bookmarks: Array<Bookmark> = [];
      for (let j = 0; j < bookmarksId.length; j++) {
        let temp: Bookmark = user.bookmarks.find(
          (i) => i.id === bookmarksId[j],
        );
        if (temp) {
          bookmarks.push(temp);
        }
      }
      if (bookmarks) {
        let result = await this.bookmarkRepository.softRemove(bookmarks);
        return new ApiResponse(200, 'delete success', '', result);
      } else {
        return new ApiResponse(404, 'not found', 'bad request');
      }
    } catch (error) {
      console.log(error);
      return new ApiResponse(404, 'somtthing wrong', 'bad request');
    }
  }

  async addBookmark(mangaId: string, userId: string) {
    try {
      let bookmark = await this.bookmarkRepository.findOne({
        where: { manga: { id: mangaId }, account: { id: userId } },
        withDeleted: true,
      });
      let response: any;
      if (bookmark && bookmark.deleteAt) {
        response = await this.bookmarkRepository.recover(bookmark);
      }
      if (!bookmark) {
        let newBookmark = new Bookmark();
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
      return new ApiResponse(200, '', '', response);
    } catch (error) {
      console.log(error);
      return new ApiResponse(404, 'somtthing wrong', 'bad request');
    }
  }

  async checkBookmarkByManga(mangaId: string, userId: string) {
    try {
      let bookmarks = await this.bookmarkRepository.findOne({
        where: { manga: { id: mangaId }, account: { id: userId } },
      });
      return new ApiResponse(200, 'success', '', {
        isBookmark: bookmarks ? true : false,
        bookmarkId: bookmarks ? bookmarks.id : '',
      });
    } catch (error) {
      console.log(error);
      return new ApiResponse(404, 'somtthing wrong', 'bad request');
    }
  }

  async addRating(
    ratingData: { mangaId: string; point: number },
    userId: string,
  ) {
    try {
      let rating = await this.ratingRepository.findOne({
        where: { manga: { id: ratingData.mangaId }, account: { id: userId } },
      });
      let response: any;
      if (rating) {
        rating.point = ratingData.point;
        response = await this.ratingRepository.save(rating);
      } else {
        let newRating = new Rating();
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
      return new ApiResponse(200, 'success', '', response);
    } catch (error) {
      console.log(error);
      return new ApiResponse(404, 'somtthing wrong', 'bad request');
    }
  }

  async getUserBookmarks(userId: string) {
    try {
      let bookmarks = await this.bookmarkRepository.find({
        where: { account: { id: userId } },
        relations: { manga: { chapters: true, ratings: true } },
      });
      bookmarks = bookmarks.sort(
        (a, b) =>
          Date.parse(b.updatedAt.toString()) -
          Date.parse(a.updatedAt.toString()),
      );
      if (bookmarks) {
        return new ApiResponse(200, 'success', '', bookmarks);
      } else {
        return new ApiResponse(200, 'success', '', []);
      }
    } catch (error) {
      console.log(error);
      return new ApiResponse(404, 'somtthing wrong', 'bad request');
    }
  }

  async updateUserName(newUserName: string, userId: string) {
    try {
      let isExistUserName = await this.accountRepository.findOne({
        where: { userName: `${newUserName}` },
      });
      if (isExistUserName) {
        return new ApiResponse(200, 'userName already exist!', '');
      }
      let user = await this.accountRepository.findOne({
        where: { id: userId },
      });
      user.userName = `${newUserName}`;
      await this.accountRepository.save(user);
      return new ApiResponse(200, 'Change userName success!', '', {
        newUserName,
      });
    } catch (error) {
      console.log(error);
      return new ApiResponse(404, 'somtthing wrong', 'bad request');
    }
  }

  async updateEmail(newEmail: string, userId: string) {
    try {
      let isExistEmail = await this.accountRepository.findOne({
        where: { email: `${newEmail}` },
      });
      if (isExistEmail) {
        return new ApiResponse(200, 'Email already exist!', '');
      }
      let user = await this.accountRepository.findOne({
        where: { id: userId },
      });
      user.email = `${newEmail}`;
      await this.accountRepository.save(user);
      return new ApiResponse(200, 'Change userName success!', '', {
        newEmail,
      });
    } catch (error) {
      console.log(error);
      return new ApiResponse(404, 'somtthing wrong', 'bad request');
    }
  }

  async updatePassword(
    newPassword: string,
    comfirmPassword: string,
    currentPassword: string,
    userId: string,
  ) {
    try {
      let user = await this.accountRepository.findOne({
        where: { id: userId },
      });
      if (
        user &&
        bcrypt.compareSync(currentPassword, user.password) &&
        newPassword === comfirmPassword
      ) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);
        user.password = hash;
        await this.accountRepository.save(user);
        return new ApiResponse(200, 'Change password success!', '', {
          isPasswordChanged: true,
        });
      } else if (
        newPassword !== comfirmPassword ||
        !bcrypt.compareSync(currentPassword, user.password)
      ) {
        return new ApiResponse(200, 'password incorrect', '', {
          isPasswordChanged: false,
        });
      } else {
        return new ApiResponse(200, 'User not exist!', '', {
          isPasswordChanged: false,
        });
      }
    } catch (error) {
      console.log(error);
      return new ApiResponse(404, 'somtthing wrong', 'bad request');
    }
  }

  async updateAvatar(file: Express.Multer.File, userId: string) {
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
      return new ApiResponse(200, 'update success!', '', {
        newAvatarUrl: newAvatar.url,
      });
    } catch (error) {
      console.log(error);
      return new ApiResponse(404, 'somtthing wrong', 'bad request');
    }
  }

  async getNewPassword(email: string) {
    try {
      let user = await this.accountRepository.findOne({
        where: { email },
      });
      if (!user) {
        return new ApiResponse(200, 'Email is not exist!', '');
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
      return new ApiResponse(200, 'New Password is send to your Email!', '');
    } catch (error) {
      console.log(error);
      return new ApiResponse(404, 'somtthing wrong', 'bad request');
    }
  }
}
