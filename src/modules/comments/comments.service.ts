import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { PostEntity } from '../posts/entities/post.entity';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) {}

  async createPostComment(id: number, createCommentDto: CreateCommentDto) {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    const newComment: CommentEntity = this.commentRepository.create({
      ...createCommentDto,
      post: post,
    });

    return await this.commentRepository.save(newComment);
  }

  async getAllComments(postId: number) {
    const options: FindManyOptions = {
      where: { 'post.id': postId },
    };
    console.log(options);
    return await this.commentRepository.find(options);
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
