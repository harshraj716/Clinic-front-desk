import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterFrontdeskDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
