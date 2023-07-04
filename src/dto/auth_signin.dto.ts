import { IsNotEmpty, MinLength } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @MinLength(6)
  userNameOrEmail: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
