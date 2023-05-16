import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @MinLength(6)
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
