import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { CommentEntity } from './entities/comment.entity';
import { PostsService } from '../posts/posts.service';
import { PostsController } from '../posts/posts.controller';
import { PostEntity } from '../posts/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PostEntity, CommentEntity])],
  controllers: [CommentsController, PostsController],
  providers: [CommentsService, PostsService],
})
export class CommentsModule {}
