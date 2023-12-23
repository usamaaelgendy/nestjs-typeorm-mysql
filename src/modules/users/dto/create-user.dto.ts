import { IsEmail, IsString, Length, Matches } from 'class-validator';
import { REGEX } from '../../../core/utils/regex';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'test@gmail.com',
    description: 'Email of user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123@aA',
    description: 'Password of user',
  })
  @IsString()
  @Length(4, 20)
  @Matches(REGEX.PASSWORD_RULES)
  password: string;

  @ApiProperty({
    example: 'test',
    description: 'Username of user',
  })
  @IsString()
  @Length(4, 20)
  username: string;
}
