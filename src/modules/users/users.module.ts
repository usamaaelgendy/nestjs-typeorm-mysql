import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ProfileService } from './services/profile.service';
import { ProfileEntity } from './entities/profile.entity';
import { ProfileController } from './controllers/profile.controller';
import { EncryptionService } from '../../core/services/encryption.service';

@Module({
  providers: [UsersService, ProfileService, EncryptionService],
  exports: [EncryptionService],
  imports: [TypeOrmModule.forFeature([UserEntity, ProfileEntity])],
  controllers: [UsersController, ProfileController],
})
export class UsersModule {}
