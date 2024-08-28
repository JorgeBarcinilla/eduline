import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
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
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtRefreshStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ]),
      ignoreExpiration: false,
      secretOrKey: JwtConstants.refresh
    });
  }

  /**
   * Metodo para extraer el token de la cookie de la petición
   * @param {Request} req - Paticion
   * @returns {string | null} - Token
   */
  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'refresh' in req.cookies && req.cookies.refresh.length > 0) {
      return req.cookies.refresh;
    }
    return null;
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
