import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';

/**
 *
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Metodo para loguear un usuario
   * @param {LoginDto} loginDto - Datos del usuario a loguear
   * @returns {Promise<LoginResponseDto>} - Datos del usuario logeado
   */
  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(AuthInterceptor)
  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  /**
   * Metodo para registrar un usuario
   * @param {CreateUserDto} createUserDto - Datos del usuario a registrar
   * @returns {Promise<LoginResponseDto>} - Datos del usuario registrado
   */
  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(AuthInterceptor)
  register(@Body() createUserDto: CreateUserDto): Promise<LoginResponseDto> {
    return this.authService.register(createUserDto);
  }
}
