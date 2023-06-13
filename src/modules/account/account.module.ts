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
@Module({
  imports: [TypeOrmModule.forFeature([Account, RefeshToken, Bookmark])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Auth)
      .forRoutes(
        { path: 'account/profile', method: RequestMethod.GET },
        { path: 'account/token/refesh', method: RequestMethod.GET },
        { path: 'account/bookmark/deleteOne', method: RequestMethod.POST },
        { path: 'account/bookmark/listDelete', method: RequestMethod.POST },
      );
  }
}
