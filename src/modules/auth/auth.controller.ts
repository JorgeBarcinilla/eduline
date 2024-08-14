import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login.dto';

/**
 *
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Metodo para loguear un usuario
   * @param {Request} request - petición del usuario
   * @returns {Promise<LoginResponseDto>} - Datos del usuario logeado
   */
  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(AuthInterceptor)
  @UseGuards(LocalAuthGuard)
  login(@Request() request): Promise<LoginResponseDto> {
    return this.authService.login(request.user);
  }

  /**
   * Metodo para registrar un usuario
   * @param {CreateUserDto} createUserDto - Datos del usuario a registrar
   * @returns {Promise<number>} - Datos del usuario registrado
   */
  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(AuthInterceptor)
  register(@Body() createUserDto: CreateUserDto): Promise<number> {
    return this.authService.register(createUserDto);
  }
}
