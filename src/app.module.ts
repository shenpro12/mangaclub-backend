import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MangaModule } from './modules/manga/manga.module';
import { ManagerModule } from './modules/manager/manager.module';
import { AccountModule } from './modules/account/account.module';
import { SiteModule } from './modules/site/site.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    MangaModule,
    AccountModule,
    ManagerModule,
    SiteModule,
  ],
})
export class AppModule {}
