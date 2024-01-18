import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from '../../services/posts.service';
import { CreatePostDto } from '../../dto/create-post.dto';
import { UpdatePostDto } from '../../dto/update-post.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../../../../core/guards/access-token.guard';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { PostHelperFunctions } from '../../post-helper-functions';
import { Roles } from '../../../../core/decorator/roles.decorator';
import { RolesGuard } from '../../../../core/guards/roles.guard';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsHelperFunctions: PostHelperFunctions,
    private readonly postsService: PostsService,
  ) {}

  @Post('createPost')
  @ApiBody({
    description: 'CreatePost',
    type: CreatePostDto,
    required: true,
  })
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  async createPost(@Request() req, @Body() createPostDto: CreatePostDto) {
    return await this.postsService.createPost(req.user.id, createPostDto);
  }

  @Get('getAllPosts')
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles('admin', 'client')
  async getAllPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(1), ParseIntPipe) limit: number,
  ) {
    const options: IPaginationOptions = {
      page,
      limit,
    };

    return await this.postsService.getAllPosts(options);
  }

  @Get('getPostById:id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  findOnePostById(@Param('id') id: number) {
    return this.postsService.getPostById(+id);
  }

  @Patch('updatePost:id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiBody({
    description: 'Provide post id',
    type: UpdatePostDto,
    required: true,
  })
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updateUserPost(+id, updatePostDto);
  }

  @Delete('deletePost:postId')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  async deletePost(@Request() req, @Param('postId') postId: number) {
    const userId = req.user.id;

    const isOwner = await this.postsHelperFunctions.isPostOwner(postId, userId);

    if (!isOwner) {
      throw new ForbiddenException(
        'You do not have permission to delete this post',
      );
    }
    return await this.postsService.deletePost(postId);
  }
}
