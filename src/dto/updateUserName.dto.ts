import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserNameDto {
  @IsNotEmpty()
  @MinLength(6)
  newUserName: string;
}
