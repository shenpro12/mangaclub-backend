import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manga } from 'src/entities/manga.entity';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { Category } from 'src/entities/category.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Manga, Category]), CloudinaryModule],
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
