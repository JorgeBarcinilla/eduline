import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserType } from './entities/user-type.entity';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

/**
 *
 */
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Endpoint para crear un nuevo usuario
   * @param {CreateUserDto} createUserDto - Objeto con los datos del usuario
   * @returns {Promise<number>} - Id del usuario creado
   */
  @Post('create')
  create(@Body() createUserDto: CreateUserDto): Promise<number> {
    return this.userService.create(createUserDto);
  }

  /**
   * Endpoint para obtener todos los usuarios
   * @returns {Promise<User[]>} - Lista de usuarios
   */
  @Get('getAll')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  /**
   * Endpoint para obtener los tipos de usuario
   * @returns {Promise<UserType[]>} - Lista de tipos de usuario
   */
  @Get('types')
  getTypes(): Promise<UserType[]> {
    return this.userService.getUserTypes();
  }

  /**
   * Endpoint para obtener un usuario
   * @param {string} id - Id del usuario
   * @returns {Promise<User>} - Usuario encontrado
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne({ id: +id });
  }

  /**
   * Endpoint para actualizar un usuario
   * @param {string} id - Id del usuario
   * @param {UpdateUserDto} updateUserDto - Objeto con los datos del usuario
   * @returns {Promise<boolean>} - Resultado de la actualización
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<boolean> {
    return this.userService.update(+id, updateUserDto);
  }

  /**
   * Endpoint para eliminar un usuario
   * @param {string} id - Id del usuario
   * @returns {Promise<boolean>} - Resultado de la eliminación
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.userService.remove(+id);
  }
}
