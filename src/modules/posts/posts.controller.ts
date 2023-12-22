import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('createPost/:userId')
  async createPost(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createPostDto: CreatePostDto,
  ) {
    return await this.postsService.createPost(userId, createPostDto);
  }

  @Get()
  getAllPosts() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOnePostById(@Param('id') id: number) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
