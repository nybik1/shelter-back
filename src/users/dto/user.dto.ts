import { IsEmail, IsNotEmpty, IsEnum } from "class-validator";
import { UserRole } from "src/types/common";

export class UserDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  firstname: string;
  @IsNotEmpty()
  lastname: string;
  @IsEnum(UserRole)
  role: string;
  @IsNotEmpty()
  password: string;
  phone: string[];
  avatar: string;
}
