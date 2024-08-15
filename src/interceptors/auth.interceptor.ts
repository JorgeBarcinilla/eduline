import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { LoginResponseDto } from 'src/modules/auth/dto/login.dto';
import { User } from 'src/modules/user/entities/user.entity';

/**
 *
 */
@Injectable()
export class AuthInterceptor implements NestInterceptor {
  /**
   * Intercepta las peticiones
   * @param {ExecutionContext} context - Contexto de la petición
   * @param {CallHandler} next - Siguiente manejador
   * @returns {Observable<any>} - Respuesta de la petición
   */
  intercept(context: ExecutionContext, next: CallHandler<LoginResponseDto>): Observable<User> {
    return next.handle().pipe(
      map(({ user, token }) => {
        const response = context.switchToHttp().getResponse();
        if (token) {
          response.cookie('token', token, {});
        }
        return user;
      })
    );
  }
}
