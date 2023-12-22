import { IsEmail, IsString, Length, Matches } from 'class-validator';
import { REGEX } from '../../../core/utils/regex';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(4, 20)
  @Matches(REGEX.PASSWORD_RULES)
  password: string;
  @IsString()
  @Length(4, 20)
  username: string;
}
