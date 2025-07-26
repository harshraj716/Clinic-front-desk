import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FrontdeskService } from './frontdesk.service';
import { Frontdesk } from './frontdesk.entity';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@Injectable()
export class FrontdeskJwtStrategy extends PassportStrategy(
  Strategy,
  'frontdesk-jwt',
) {
  constructor(private frontdeskService: FrontdeskService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'jwt_secret_key',
    });
  }

  async validate(payload: JwtPayload): Promise<Frontdesk> {
    const user = await this.frontdeskService.findByEmail(payload.email);
    if (!user) throw new UnauthorizedException('Frontdesk staff not found');
    return user;
  }
}
