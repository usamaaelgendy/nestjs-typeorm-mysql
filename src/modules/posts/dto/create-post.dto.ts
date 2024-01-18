import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'Title of post',
    example: 'Hello title',
  })
  title: string;
  @ApiProperty({
    description: 'Post description',
    example: 'Hello description',
  })
  description: string;
}
