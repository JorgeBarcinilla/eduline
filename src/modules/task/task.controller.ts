import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';

/**
 *
 */
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /**
   * Endpoint para crear una nueva tarea
   * @param {CreateTaskDto} createTaskDto - Objeto con los datos de la tarea
   * @returns {Promise<number>} - Id de la tarea creada
   */
  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<number> {
    return this.taskService.create(createTaskDto);
  }

  /**
   * Endpoint para obtener todas las tareas
   * @returns {Promise<Task[]>} - Lista de tareas
   */
  @Get('getAll')
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  /**
   * Endpoint para obtener una tarea
   * @param {string} id - Id de la tarea
   * @returns {Promise<Task>} - Tarea encontrada
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.findOne({ id: +id });
  }

  /**
   * Endpoint para actualizar una tarea
   * @param {string} id - Id de la tarea
   * @param {UpdateTaskDto} updateTaskDto - Objeto con los datos de la tarea
   * @returns {Promise<boolean>} - Resultado de la actualización
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<boolean> {
    return this.taskService.update(+id, updateTaskDto);
  }

  /**
   * Endpoint para eliminar una tarea
   * @param {string} id - Id de la tarea
   * @returns {Promise<boolean>} - Resultado de la eliminación
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.taskService.remove(+id);
  }
}
