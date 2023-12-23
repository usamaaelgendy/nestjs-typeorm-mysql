import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    const token = this.authService.generateToken(req.user);

    return {
      token,
      ...req.user,
    };
  }
}
