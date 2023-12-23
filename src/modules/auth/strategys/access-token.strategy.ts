import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as process from 'process';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authenticationService: AuthService) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any): Promise<any> {
    return {
      id: payload.id,
      email: payload.email,
      username: payload.username,
    };
  }
}
