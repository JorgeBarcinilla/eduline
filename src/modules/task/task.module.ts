import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskStudent } from './entities/task-student.entity';
import { Task } from './entities/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

/**
 *
 */
@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskStudent])],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
