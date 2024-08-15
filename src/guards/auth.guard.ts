import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtConstants } from 'src/common/constants/jwt-secret';

/**
 * Clase para validar el token en los endpoints.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jWtService: JwtService) {}

  /**
   * Metodo que se ejecuta al inplementar el guard.
   * @param {ExecutionContext} context - contexto donde se realiza la peticion.
   * @returns {boolean | Promise<boolean> | Observable<boolean>} - define si deja continuar la peticion.
   */
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies?.token;
    if (!token) throw new UnauthorizedException();
    try {
      const payload = this.jWtService.verify(token, {
        secret: JwtConstants.secret
      });
      request['payload'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  /**
   * Metodo para extraer el token de la peticion.
   * @param {Request} request - Peticion
   * @returns {string} - Token
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
