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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('createUser')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get('getAllUsers')
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneUserById(+id);
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
