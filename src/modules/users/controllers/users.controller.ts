import {
  Controller,
  DefaultValuePipe,
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
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('getAllUsers')
  @UseGuards(AccessTokenGuard)
  @ApiOkResponsePaginated(UserEntity)
  @ApiOkResponse({ description: 'Get all users' })
  async getAllUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(1), ParseIntPipe) limit: number,
  ): Promise<Pagination<UserEntity>> {
    const options: IPaginationOptions = {
      page,
      limit,
    };
    return await this.usersService.getUserPagination(options);
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
