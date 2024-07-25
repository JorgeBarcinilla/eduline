import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login({ email, password }: LoginDto): Promise<User> {
    const user = await this.userService.findOne({ email });
    if (await bcrypt.compare(password, user.password)) {
      delete user.password;
      return user;
    }
    throw new UnauthorizedException();
  }

  async register(createUser: CreateUserDto) {
    const hashPassword = await bcrypt.hash(createUser.password, 10);
    createUser = { ...createUser, password: hashPassword };
    return this.userService.create(createUser);
  }
}
