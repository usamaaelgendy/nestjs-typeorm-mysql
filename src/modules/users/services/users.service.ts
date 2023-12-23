import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class UsersService {
  constructor(
    private readonly i18n: I18nService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  getAllUsers(): Promise<[UserEntity[], count: number]> {
    // This way to get all users will return all the users with all the posts and profiles
    // return this.userRepository.find({ relations: ['profile', 'posts'] });
    return this.userRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.profile', 'profile')
      .leftJoinAndSelect('users.posts', 'posts')
      .leftJoinAndSelect('posts.comments', 'comments')
      .getManyAndCount();
  }

  getUserById(id: number) {
    const options: FindOneOptions = {
      where: { id },
      relations: ['profile', 'posts', 'posts.comments'],
    };

    return this.userRepository.findOne(options);
  }

  getUserByEmail(email: string) {
    const options: FindOneOptions = {
      where: { email },
      relations: ['profile', 'posts', 'posts.comments'],
    };

    return this.userRepository.findOne(options);
  }

  // Helper function
  async getUserPagination(
    options: IPaginationOptions,
  ): Promise<Pagination<UserEntity>> {
    const userDB = this.userRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.profile', 'profile')
      .leftJoinAndSelect('users.posts', 'posts')
      .leftJoinAndSelect('posts.comments', 'comments')
      .orderBy('users.id', 'DESC');

    return paginate<UserEntity>(userDB, options);
  }
}
