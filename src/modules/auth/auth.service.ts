import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtConstants } from 'src/common/constants/jwt-secret';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthRefreshTokenPayload, LoginResponseDto } from './dto/login.dto';
import { AuthRefreshToken } from './entities/authRefreshToken.entity';

/**
 *
 */
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(AuthRefreshToken)
    private authRefreshTokenRepository: Repository<AuthRefreshToken>
  ) {}

  /**
   * Metodo para realizar el inicio de sesión
   * @param {User} user - Datos del usuario
   * @returns {Promise<LoginResponseDto>} - Datos y token del usuario
   */
  async login(user: User): Promise<LoginResponseDto> {
    const token = await this.generateTokenPair(user);
    return { user, ...token };
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

  /** REFRESH TOKEN  */

  /**
   * Metodo para generar un nuevo token de refresco
   * @param {User} user - Id del usuario
   * @param {string} currentRefreshToken - Token de refresco actual
   * @param {[Date]} currentRefreshTokenExpiresAt - Fecha de expiración del token de refresco actual
   * @returns {Promise<string>} - Nuevo token de refresco
   */
  async generateRefreshToken(
    user: User,
    currentRefreshToken?: string,
    currentRefreshTokenExpiresAt?: Date
  ): Promise<string> {
    const refreshPayload: AuthRefreshTokenPayload = { id: user.id, email: user.email };
    const newRefreshToken = this.jwtService.sign(refreshPayload, { secret: JwtConstants.refresh, expiresIn: '30d' });

    if (currentRefreshToken) {
      if (await this.isRefreshTokenBlackListed(currentRefreshToken, user.id)) {
        throw new UnauthorizedException('Invalid refresh token.');
      }

      await this.authRefreshTokenRepository.insert({
        token: currentRefreshToken,
        expiration: currentRefreshTokenExpiresAt,
        userId: user.id
      });
    }

    return newRefreshToken;
  }

  /**
   * Metodo para validar si un token de refresco está en la lista negra
   * @param {string} token - Token de refresco
   * @param {number} userId - Id del usuario
   * @returns {Promise<boolean>} - Validación si el token esta en la lista negra
   */
  private isRefreshTokenBlackListed(token: string, userId: number) {
    return this.authRefreshTokenRepository.existsBy({ token, userId });
  }

  /**
   * Metodo para generar un par de tokens
   * @param {User} user - Datos del usuario
   * @param {string} currentRefreshToken - Token de refresco actual
   * @param {string} currentRefreshTokenExpiresAt - Fecha de expiración del token de refresco actual
   * @returns {Promise<{ token: string; refresh: string }>} - Par de tokens
   */
  async generateTokenPair(
    user: User,
    currentRefreshToken?: string,
    currentRefreshTokenExpiresAt?: Date
  ): Promise<Omit<LoginResponseDto, 'user'>> {
    const payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
      refresh: await this.generateRefreshToken(user, currentRefreshToken, currentRefreshTokenExpiresAt)
    };
  }

  /**
   *
   */
  /*@Cron(CronExpression.EVERY_DAY_AT_6AM)
  async clearExpiredRefreshTokens() {
    await this.authRefreshTokenRepository.delete({ expiresAt: LessThanOrEqual(new Date()) });
  }*/
}
