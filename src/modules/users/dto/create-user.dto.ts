import { IsEmail, IsString, Length, Matches } from 'class-validator';
import { REGEX } from '../../../core/utils/regex';
import * as i18n from 'i18n';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(4, 20)
  @Matches(REGEX.PASSWORD_RULES, {
    message: i18n.__('password_validation_error_message'),
  })
  password: string;
  @IsString()
  @Length(4, 20)
  username: string;
}
