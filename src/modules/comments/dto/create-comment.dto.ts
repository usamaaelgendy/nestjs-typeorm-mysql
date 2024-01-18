import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment on the post',
    example: 'Hello Comment',
  })
  @IsNotEmpty()
  comment: string;
}
