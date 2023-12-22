import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { ApiOkResponsePaginated } from '../../../core/decorator/api-ok-response-paginated';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('createUser')
  async createUser(
    @I18n() i18n: I18nContext,
    @Body() createUserDto: CreateUserDto,
  ) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get('getAllUsers')
  @ApiOkResponsePaginated(UserEntity)
  async getAllUsers(): Promise<[UserEntity[], number]> {
    return await this.usersService.getAllUsers();
  }

  @Get('getUserById/:id')
  async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserById(+id);
  }

  @Patch('updateUser/:id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(+id, updateUserDto);
  }

  @Delete('deleteUserById/:id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    return await this.usersService.deleteUserById(+id);
  }
}
