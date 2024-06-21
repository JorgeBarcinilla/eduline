import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { User } from 'src/repository/user/user.entity';
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

  @Post('create')
  createUser(@Body() body: User){
    return this.userService.createUser(body);
  }

  @Patch(':id')
  updateUser(@Body() body: Partial<User>, @Param('id') id: number){
    return this.userService.updateUser(body, id);
  }

}
