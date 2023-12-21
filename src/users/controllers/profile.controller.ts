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
import { ProfileService } from '../services/profile.service';
import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';
import { CreateUserProfileDto } from '../dto/create-user-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('createUserProfile/:id')
  async createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return await this.profileService.createUserProfile(
      id,
      createUserProfileDto,
    );
  }

  @Get('getUserProfile/:id')
  getUserProfile(@Param('id') id: string) {
    return this.profileService.getUserProfile(+id);
  }

  @Patch('updateUser/:id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserProfileDto,
  ) {
    return await this.profileService.updateUserProfile(+id, updateUserDto);
  }

  @Delete('deleteUserById/:id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    return await this.profileService.deleteUserProfileById(+id);
  }
}
