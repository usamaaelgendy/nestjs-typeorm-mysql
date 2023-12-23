import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';
import { EncryptionService } from '../../../core/services/encryption.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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

  generateToken(user: UserEntity) {
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
      username: user.username,
    });
  }
}
