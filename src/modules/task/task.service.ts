import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
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
    private taskStudentRepository: Repository<TaskStudent>
  ) {}

  /**
   * Metodo para crear una nueva tarea
   * @param {CreateTaskDto} createTaskDto - Objeto con los datos de la tarea
   * @returns {Promise<number>} - Id de la tarea creada
   */
  async create(createTaskDto: CreateTaskDto): Promise<number> {
    const result = await this.taskRepository.insert(createTaskDto);
    return result.identifiers[0].id;
  }

  /**
   * Metodo para obtener todas las tareas
   * @returns {Promise<Task[]>} - Lista de tareas
   */
  findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      relations: {
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
    });
  }

  /**
   * Metodo para obtener una tarea
   * @param {FindOptionsWhere<Task> | FindOptionsWhere<Task>[]} where - Parametros de busqueda
   * @returns {Promise<Task>} - Tarea encontrada
   */
  findOne(where: FindOptionsWhere<Task> | FindOptionsWhere<Task>[]): Promise<Task> {
    return this.taskRepository.findOne({ where });
  }

  /**
   * Metodo para actualizar una tarea
   * @param {number} id - Id de la tarea
   * @param {UpdateTaskDto} updateTaskDto - Objeto con los datos de la tarea
   * @returns {Promise<boolean>} - Resultado de la actualización
   */
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<boolean> {
    const result = await this.taskRepository.update(id, updateTaskDto);
    return result.affected > 0;
  }

  /**
   * Metodo para eliminar una tarea
   * @param {number} id - Id de la tarea
   * @returns {Promise<boolean>} - Resultado de la eliminación
   */
  async remove(id: number): Promise<boolean> {
    const result = await this.taskRepository.delete(id);
    return result.affected > 0;
  }
}
