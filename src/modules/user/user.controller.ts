import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('types')
  getUserTypes() {
    return this.userService.getUserTypes();
  }

  @Get('getAll')
  getUsers() {
    return this.userService.getAllUsers();
  }
}
