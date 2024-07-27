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
    private userRepository: Repository<User>,
  ) {}

  /**
   *
   * @param createUserDto
   */
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.save(createUserDto);
    return user.id;
  }

  /**
   *
   */
  findAll() {
    return this.userRepository.find({
      relations: ['usertype'],
    });
  }

  /**
   *
   * @param where
   */
  findOne(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]) {
    return this.userRepository.findOne({ where });
  }

  /**
   *
   * @param email
   */
  findOneEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  /**
   *
   * @param id
   * @param updateUserDto
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    const response = await this.userRepository.update(id, updateUserDto);
    return response.affected > 0;
  }

  /**
   *
   * @param id
   */
  async remove(id: number) {
    const response = await this.userRepository.delete(id);
    return response.affected > 0;
  }

  /**
   *
   */
  getUserTypes() {
    return this.userTypeRepository.find({
      relations: ['users'],
    });
  }
}
