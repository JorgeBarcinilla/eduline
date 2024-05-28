import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserType } from './repository/user/user-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(UserType)
    private userTypeRepository: Repository<UserType>
  ){}

  getAllUserTypes(){
    return this.userTypeRepository.find();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
