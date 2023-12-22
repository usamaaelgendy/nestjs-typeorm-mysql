import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class UsersService {
  constructor(
    private readonly i18n: I18nService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    // try {

    // console.log(
    //   this.i18n.t('translate.testLanguage', {
    //     args: { lang: I18nContext.current().lang },
    //   }),
    // );
    const newUser: UserEntity = this.userRepository.create({
      ...createUserDto,
      createdAt: new Date(),
    });

    return await this.userRepository.save(newUser);
    // } catch (error) {
    //   if (error.code === Error['ER_DUP_ENTRY']) {
    //     throw new ConflictException('Email already exists');
    //   } else {
    //     throw new ConflictException('Error creating user');
    //   }
    // }
  }

  getAllUsers(): Promise<[UserEntity[], count: number]> {
    // This way to get all users will return all the users with all the posts and profiles
    // return this.userRepository.find({ relations: ['profile', 'posts'] });
    return this.userRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.profile', 'profile')
      .leftJoinAndSelect('users.posts', 'posts')
      .leftJoinAndSelect('posts.comments', 'comments')
      .take(1)
      .getManyAndCount();
  }

  getUserById(id: number) {
    const options: FindOneOptions = {
      where: { id },
      relations: ['profile', 'posts', 'posts.comments'],
    };

    return this.userRepository.findOne(options);
  }

  deleteUserById(id: number) {
    return this.userRepository.delete(id);
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }
}
