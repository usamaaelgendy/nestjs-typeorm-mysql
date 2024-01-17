import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../../../core/guards/local-auth.guard';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from '../../users/entities/user.entity';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { AccessTokenGuard } from '../../../core/guards/access-token.guard';
import { UpdateUserDto } from '../../users/dto/update-user.dto';
import { RefreshTokenGuard } from '../../../core/guards/refresh-token.guard';
import { LoginDto } from '../dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  @ApiCreatedResponse({
    type: UserEntity,
    description: 'The record has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: "User can't be created due to bad request",
  })
  async signUp(
    @I18n() i18n: I18nContext,
    @Body() createUserDto: CreateUserDto,
  ) {
    return await this.authService.signUp(createUserDto);
  }

  @Post('signIn')
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    description: 'Provide email and password for authentication',
    type: LoginDto,
    required: true,
  })
  async signIn(@Request() req) {
    const token: { accessToken: string; refreshToken: string } =
      await this.authService.getTokens(req.user);
    if (token) {
      await this.authService.updateRefreshToken(
        req.user.id,
        token.refreshToken,
      );
    }

    return {
      ...token,
      ...req.user,
    };
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refreshToken')
  refreshTokens(@Request() req) {
    const userId = req.user.id;
    const refreshToken = req.user.refreshToken;
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Get('logout')
  @UseGuards(AccessTokenGuard)
  async logout(@Request() req) {
    await this.authService.deleteRefreshToken(req.user.id);

    return true;
  }

  @Patch('updateUser/:id')
  @UseGuards(AccessTokenGuard)
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.authService.updateUser(+id, updateUserDto);
  }

  @Delete('deleteUserById/:id')
  @UseGuards(AccessTokenGuard)
  async remove(@Param('id', ParseIntPipe) id: string) {
    return await this.authService.deleteUserById(+id);
  }
}
