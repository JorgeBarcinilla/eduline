import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserType } from './entities/user-type.entity';
import { User } from './entities/user.entity';

/**
 *
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserType)
    private userTypeRepository: Repository<UserType>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  /**
   * Metodo para crear un nuevo usuario
   * @param {CreateUserDto} createUserDto - Objeto con los datos del usuario
   * @returns {Promise<number>} - Id del usuario creado
   */
  async create(createUserDto: CreateUserDto): Promise<number> {
    const user = await this.userRepository.save(createUserDto);
    return user.id;
  }

  /**
   * Metodo para obtener todos los usuarios
   * @returns {Promise<User[]>} - Lista de usuarios
   */
  findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['usertype']
    });
  }

  /**
   * Metodo para obtener un usuario
   * @param {FindOptionsWhere<User> | FindOptionsWhere<User>[]} where - Parametros de busqueda
   * @returns {Promise<User>} - Usuario encontrado
   */
  findOne(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<User> {
    return this.userRepository.findOne({ where });
  }

  /**
   * Metodo para actualizar un usuario
   * @param {number} id - Id del usuario
   * @param {UpdateUserDto} updateUserDto - Objeto con los datos del usuario
   * @returns {Promise<boolean>} - Resultado de la actualización
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<boolean> {
    const response = await this.userRepository.update(id, updateUserDto);
    return response.affected > 0;
  }

  /**
   * Metodo para eliminar un usuario
   * @param {number} id - Id del usuario
   * @returns {Promise<boolean>} - Resultado de la eliminación
   */
  async remove(id: number): Promise<boolean> {
    const response = await this.userRepository.delete(id);
    return response.affected > 0;
  }

  /**
   * Metodo para obtener los tipos de usuario
   * @returns {Promise<UserType[]>} - Lista de tipos de usuario
   */
  getUserTypes(): Promise<UserType[]> {
    return this.userTypeRepository.find({
      relations: ['users']
    });
  }
}
