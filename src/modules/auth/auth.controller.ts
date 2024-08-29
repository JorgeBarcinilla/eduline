import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { Request } from 'express';
import { JwtRefreshGuard } from 'src/guards/jwt-refresh.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login.dto';

/**
 *
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Endpoint para loguear un usuario
   * @param {Request} request - petición del usuario
   * @returns {Promise<LoginResponseDto>} - Datos del usuario logeado
   */
  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(AuthInterceptor)
  @UseGuards(LocalAuthGuard)
  login(@Req() request: Request): Promise<LoginResponseDto> {
    return this.authService.login(request.user as User);
  }

  /**
   * Endpoint para registrar un usuario
   * @param {CreateUserDto} createUserDto - Datos del usuario a registrar
   * @returns {Promise<number>} - Datos del usuario registrado
   */
  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(AuthInterceptor)
  register(@Body() createUserDto: CreateUserDto): Promise<number> {
    return this.authService.register(createUserDto);
  }

  /**
   * Endpoint para refrescar los tokens
   * @param {Request} req - Petición del usuario
   * @returns {Promise<Omit<LoginResponseDto, "user">>} - Tokens refrescados
   */
  @Post('refresh-token')
  @UseGuards(JwtRefreshGuard)
  @UseInterceptors(AuthInterceptor)
  refreshTokens(@Req() req: Request): Promise<Omit<LoginResponseDto, 'user'>> {
    if (!req['user']) {
      throw new UnauthorizedException();
    }
    return this.authService.generateTokenPair(req['user'] as User, req.cookies['refresh']);
  }
}
