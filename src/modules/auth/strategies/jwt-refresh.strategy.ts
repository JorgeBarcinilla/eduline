import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConstants } from 'src/common/constants/jwt-secret';
import { UserService } from 'src/modules/user/user.service';
import { AuthTokenPayload } from '../dto/login.dto';

/**
 *
 */
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConstants.refresh
    });
  }

  /**
   * Metodo que valida el token
   * @param {AuthTokenPayload} payload - Payload del token
   * @returns {Promise<any>} - Datos del usuario
   */
  async validate(payload: AuthTokenPayload) {
    return { userId: payload.id, username: payload.email };
  }
}
