import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskStudent } from './entities/task-student.entity';
import { Task } from './entities/task.entity';

/**
 *
 */
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(TaskStudent)
    private taskStudentRepository: Repository<TaskStudent>,
  ) {}

  /**
   *
   * @param createTaskDto
   */
  create() {
    return 'This action adds a new task';
  }

  /**
   *
   */
  findAll() {
    return this.taskRepository.find({
      relations: {
        teacherCourse: {
          teacher: true,
          course: true,
        },
        answers: {
          files: true,
          student: {
            teacherCourses: true,
          },
        },
      },
    });
  }

  /**
   *
   * @param id
   */
  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  /**
   *
   * @param id
   * @param updateTaskDto
   */
  update(id: number) {
    return `This action updates a #${id} task`;
  }

  /**
   *
   * @param id
   */
  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
