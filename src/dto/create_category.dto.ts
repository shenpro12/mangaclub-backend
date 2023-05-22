import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @MaxLength(50)
  slug: string;
}
