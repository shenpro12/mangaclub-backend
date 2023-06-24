import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { RefeshToken } from 'src/entities/user_refeshtoken.entity';
import { Auth } from 'src/middleware/auth.middleware';
import { Bookmark } from 'src/entities/bookmark.entity';
import { Manga } from 'src/entities/manga.entity';
import { Rating } from 'src/entities/rating.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Account, RefeshToken, Bookmark, Manga, Rating]),
    CloudinaryModule,
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Auth).forRoutes(
      { path: 'account/profile', method: RequestMethod.GET },
      { path: 'account/bookmarks', method: RequestMethod.GET },
      { path: 'account/token/refesh', method: RequestMethod.GET },
      { path: 'account/bookmark/add', method: RequestMethod.PUT },
      { path: 'account/bookmark/isBookmark', method: RequestMethod.POST },
      { path: 'account/bookmark/deleteOne', method: RequestMethod.DELETE },
      { path: 'account/bookmark/listDelete', method: RequestMethod.DELETE },
      { path: 'account/manga/rating', method: RequestMethod.PUT },
      {
        path: 'account/profile/username/update',
        method: RequestMethod.POST,
      },
      {
        path: 'account/profile/email/update',
        method: RequestMethod.POST,
      },
      {
        path: 'account/profile/pasword/update',
        method: RequestMethod.POST,
      },
      {
        path: 'account/profile/avatar/update',
        method: RequestMethod.POST,
      },
    );
  }
}
