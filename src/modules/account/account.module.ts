import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { RefeshToken } from 'src/entities/user_refeshtoken.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Account, RefeshToken])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
