import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserEntity } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';
import { EncryptionService } from '../../../core/services/encryption.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UpdateUserDto } from '../../users/dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any | undefined> {
    const userExists = await this.usersService.getUserByEmail(
      createUserDto.email,
    );
    if (userExists) {
      throw new BadRequestException(
        'User already exists',
        'User already exists',
      );
    }
    const newUser: UserEntity = this.userRepository.create({
      ...createUserDto,
      createdAt: new Date(),
    });
    const tokens = await this.getTokens(newUser);

    const user = await this.userRepository.save(newUser);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return {
      ...user,
      ...tokens,
    };
  }

  async getUserCredential(
    email: string,
    password: string,
  ): Promise<UserEntity | undefined> {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) throw new BadRequestException();
    if (!(await EncryptionService.compare(password, user.password))) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'User already exists',
        },
        HttpStatus.CONFLICT,
      );
    }
    return user;
  }

  async getTokens(user: UserEntity) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '1d',
        },
      ),
      this.jwtService.signAsync(
        {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  deleteUserById(id: number) {
    return this.userRepository.delete(id);
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await EncryptionService.encrypt(refreshToken);
    await this.userRepository.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async deleteRefreshToken(userId: number) {
    await this.userRepository.update(userId, {
      refreshToken: null,
    });
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user: UserEntity = await this.usersService.getUserById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await EncryptionService.compare(
      refreshToken,
      user.refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
