import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { CreateMangaDto } from 'src/dto/create_manga.dto';
import { ManagerService } from './manager.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCategoryDto } from 'src/dto/create_category.dto';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post('manga/create')
  @UseInterceptors(FileInterceptor('thumb_url'))
  createManga(
    @Body() body: CreateMangaDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.managerService.createManga(body, file);
  }

  @Post('category/create')
  createCategory(@Body() body: CreateCategoryDto) {
    return this.managerService.createCategory(body);
  }
}
