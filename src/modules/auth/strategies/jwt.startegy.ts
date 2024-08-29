import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConstants } from 'src/common/constants/jwt-secret';
import { AuthTokenPayload, AuthTokenPayloadValidate } from '../dto/login.dto';

/**
 *
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT, ExtractJwt.fromAuthHeaderAsBearerToken()]),
      ignoreExpiration: false,
      secretOrKey: JwtConstants.secret
    });
  }

  /**
   * Metodo para extraer el token de la cookie de la petición
   * @param {Request} req - Paticion
   * @returns {string | null} - Token
   */
  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'token' in req.cookies && req.cookies.token.length > 0) {
      return req.cookies.token;
    }
    return null;
  }

  /**
   * Metodo para validar un token
   * @param {AuthTokenPayload} payload - Payload del token
   * @returns {Promise<AuthTokenPayloadValidate>} - Datos del usuario
   */
  async validate(payload: AuthTokenPayload): Promise<AuthTokenPayloadValidate> {
    return { info: { id: payload.id, email: payload.email } };
  }
}
