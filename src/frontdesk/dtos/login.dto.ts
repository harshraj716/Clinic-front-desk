import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginFrontdeskDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
