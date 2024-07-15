import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStudent } from './entities/task-student.entity';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(TaskStudent)
    private taskStudentRepository: Repository<TaskStudent>
  ) {}

  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  findAll() {
    return this.taskRepository.find({
      relations:{
        teacherCourse: {
          teacher: true,
          course: true
        },
        answers: {
          files: true,
          student: {
            teacherCourses: true
          }

        }
      }
    }
  );
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
