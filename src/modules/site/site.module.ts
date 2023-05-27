import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { SiteController } from './site.controller';
import { SiteService } from './site.service';
@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [SiteController],
  providers: [SiteService],
})
export class SiteModule {}
