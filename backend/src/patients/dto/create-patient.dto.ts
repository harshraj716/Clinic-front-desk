import { IsString, IsNotEmpty, IsInt, MinLength } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(10)
  phone: string;

  @IsInt()
  age: number;
}
