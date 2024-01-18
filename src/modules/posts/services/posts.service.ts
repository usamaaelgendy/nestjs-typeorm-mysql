import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async createPost(id: number, createPostDto: CreatePostDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newPost: PostEntity = this.postRepository.create({
      ...createPostDto,
      user,
    });

    return this.postRepository.save(newPost);
  }

  getAllPosts(options: IPaginationOptions): Promise<Pagination<PostEntity>> {
    const postsDb = this.postRepository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.comments', 'comments')
      .orderBy('posts.id', 'DESC');

    return paginate<PostEntity>(postsDb, options);
  }

  getPostById(id: number): Promise<PostEntity> {
    const options: FindOneOptions = {
      where: { id },
      relations: ['user', 'comments'],
    };

    return this.postRepository.findOne(options);
  }

  updateUserPost(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async deletePost(postId: number): Promise<boolean> {
    const result = await this.postRepository.delete(postId);

    if (result.affected === 0) {
      throw new NotFoundException('Post not found');
    }
    return true;
  }
}
