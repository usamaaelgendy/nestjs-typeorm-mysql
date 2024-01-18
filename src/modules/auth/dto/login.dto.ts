// auth.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'User email',
    example: 'u@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: '123@aA',
  })
  password: string;
}
