import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthTokenPayload, LoginDto, LoginResponseDto } from './dto/login.dto';

/**
 *
 */
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Metodo para realizar el inicio de sesión
   * @param {LoginDto} root0 - Datos de inicio de sesión.
   * @param {string} root0.email - Email del usuario
   * @param {string} root0.password - Contraseña del usuario
   * @returns {Promise<LoginResponseDto>} - Datos y token del usuario
   */
  async login({ email, password }: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userService.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: AuthTokenPayload = { email: user.email, id: user.id };
      const token = await this.jwtService.signAsync(payload);
      return { user, token };
    }
    throw new UnauthorizedException();
  }

  /**
   * Metodo para registrar un usuario
   * @param {CreateUserDto} createUser - Datos del usuario a registrar
   * @returns {Promise<LoginResponseDto>} - Datos del usuario registrado
   */
  async register(createUser: CreateUserDto) {
    const decryptPassword = createUser.password;
    const hashPassword = await bcrypt.hash(decryptPassword, 10);
    createUser = { ...createUser, password: hashPassword };
    return this.userService.create(createUser).then(() => {
      return this.login({ email: createUser.email, password: decryptPassword });
    });
  }
}
