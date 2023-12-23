import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategyService extends PassportStrategy(Strategy) {
  constructor(private readonly authenticationService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authenticationService.getUserCredential(
      email,
      password,
    );
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
