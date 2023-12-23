import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import { UserEntity } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';
import { EncryptionService } from '../../../core/services/encryption.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async getUserCredential(
    email: string,
    password: string,
  ): Promise<UserEntity | undefined> {
    const user = await this.userService.getUserByEmail(email);
    console.log(user);

    if (!user) throw new BadRequestException();
    if (!(await EncryptionService.comparePasswords(password, user.password))) {
      throw new BadRequestException();
    }
    return user;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
