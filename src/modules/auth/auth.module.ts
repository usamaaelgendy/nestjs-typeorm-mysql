import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategyService } from './strategys/local-strategy.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyService } from './strategys/jwt-strategy.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategyService, JwtStrategyService],
})
export class AuthModule {}
