import { Module } from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { PostsController as PostsControllerV1 } from './controllers/v1/posts.controller';
import { PostsController as PostsControllerV2 } from './controllers/v2/posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { PostEntity } from './entities/post.entity';
import { PostHelperFunctions } from './post-helper-functions';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PostEntity])],
  controllers: [PostsControllerV1, PostsControllerV2],
  providers: [PostsService, PostHelperFunctions],
  exports: [PostsService, PostHelperFunctions],
})
export class PostsModule {}
