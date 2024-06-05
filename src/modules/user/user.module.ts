import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserType } from 'src/repository/user/user-type.entity';
import { User } from 'src/repository/user/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserType, User]), // Add this line
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
