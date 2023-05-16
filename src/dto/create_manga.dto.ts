import {
  IsNotEmpty,
  MaxLength,
  IsBooleanString,
  IsNumberString,
} from 'class-validator';

export class CreateMangaDto {
  @IsNotEmpty()
  @MaxLength(500)
  name: string;

  @IsNotEmpty()
  @MaxLength(500)
  alternative: string;

  @IsNotEmpty()
  @MaxLength(100)
  author: string;

  @IsNotEmpty()
  @IsBooleanString()
  status: boolean;

  @IsNotEmpty()
  @MaxLength(500)
  slug: string;

  @IsNotEmpty()
  @MaxLength(2000)
  description: string;

  @IsNotEmpty()
  @IsNumberString()
  views: number;
}
