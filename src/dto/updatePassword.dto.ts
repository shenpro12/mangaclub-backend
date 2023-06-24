import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;

  @IsNotEmpty()
  @MinLength(8)
  comfirmPassword: string;

  @IsNotEmpty()
  @MinLength(8)
  currentPassword: string;
}
