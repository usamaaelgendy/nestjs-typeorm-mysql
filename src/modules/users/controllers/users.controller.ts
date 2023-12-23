import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserEntity } from '../entities/user.entity';
import { ApiOkResponsePaginated } from '../../../core/decorator/api-ok-response-paginated';
import { AccessTokenGuard } from '../../../core/guards/access-token.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('getAllUsers')
  @UseGuards(AccessTokenGuard)
  @ApiOkResponsePaginated(UserEntity)
  async getAllUsers(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ): Promise<[UserEntity[], number]> {
    console.log('page', page);
    console.log('limit', limit);
    return await this.usersService.getAllUsers();
  }

  @Get('getUserById/:id')
  async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserById(+id);
  }

  @Get('getUserByToken')
  @UseGuards(AccessTokenGuard)
  async getUserByToken(@Request() req) {
    return await this.usersService.getUserById(req.user.id);
  }
}
