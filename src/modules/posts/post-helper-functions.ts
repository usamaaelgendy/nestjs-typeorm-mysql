// post-ownership.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PostEntity } from './entities/post.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostHelperFunctions {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async isPostOwner(postId: number, userId: number): Promise<boolean> {
    const options: FindOneOptions = {
      where: { id: postId },
      relations: ['user'],
      // loadRelationIds: { relations: ['user'] },
    };
    const post: PostEntity = await this.postRepository.findOne(options);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post.user.id === userId;
  }
}
