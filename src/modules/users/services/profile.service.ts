import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from '../entities/profile.entity';
import { CreateUserProfileDto } from '../dto/create-user-profile.dto';
import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}

  async createUserProfile(
    id: number,
    createUserProfileDto: CreateUserProfileDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newUser: ProfileEntity = this.profileRepository.create({
      ...createUserProfileDto,
    });

    await this.profileRepository.save(newUser);

    user.profile = newUser;
    return this.userRepository.save(user);
  }

  getUserProfile(id: number) {
    return `This action returns a #${id} user`;
  }

  deleteUserProfileById(id: number) {
    return this.profileRepository.delete(id);
  }

  updateUserProfile(id: number, updateUserProfileDto: UpdateUserProfileDto) {
    return this.profileRepository.update(id, updateUserProfileDto);
  }
}
