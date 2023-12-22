import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const newUser: UserEntity = this.userRepository.create({
        ...createUserDto,
        createdAt: new Date(),
      });

      return await this.userRepository.save(newUser);
    } catch (error) {
      console.log(error.code);
      if (error.code === Error['ER_DUP_ENTRY']) {
        throw new ConflictException('Email already exists');
      } else {
        throw new ConflictException('Error creating user');
      }
    }
  }

  getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find({ relations: ['profile', 'posts'] });
  }

  findOneUserById(id: number) {
    return `This action returns a #${id} user`;
  }

  deleteUserById(id: number) {
    return this.userRepository.delete(id);
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }
}
