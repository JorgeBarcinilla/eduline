import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthTokenPayload, LoginResponseDto } from './dto/login.dto';

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
   * @param {User} user - Datos del usuario
   * @returns {Promise<LoginResponseDto>} - Datos y token del usuario
   */
  async login(user: User): Promise<LoginResponseDto> {
    const payload: AuthTokenPayload = { email: user.email, id: user.id };
    const token = await this.jwtService.signAsync(payload);
    return { user, token };
  }

  /**
   * Metodo para registrar un usuario
   * @param {CreateUserDto} createUser - Datos del usuario a registrar
   * @returns {Promise<number>} - Id del usuario
   */
  async register(createUser: CreateUserDto): Promise<number> {
    const decryptPassword = createUser.password;
    const hashPassword = await bcrypt.hash(decryptPassword, 10);
    createUser = { ...createUser, password: hashPassword };
    return this.userService.create(createUser);
  }

  /**
   * Metodo para validar un usuario
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise<User | null>} - Usuario
   */
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
