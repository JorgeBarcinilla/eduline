import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login({ email, password }: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userService.findOne({ email });
    const payload = { email: user.email, sub: user.id };
    const token = await this.jwtService.signAsync(payload);
    if (await bcrypt.compare(password, user.password)) {
      return { user, token };
    }
    throw new UnauthorizedException();
  }

  async register(createUser: CreateUserDto) {
    const hashPassword = await bcrypt.hash(createUser.password, 10);
    createUser = { ...createUser, password: hashPassword };
    return this.userService.create(createUser);
  }
}
