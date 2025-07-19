import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';
export class LoginCustomerDto{

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}