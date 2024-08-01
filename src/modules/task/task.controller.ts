import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

/**
 *
 */
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /**
   *
   * @param createTaskDto
   */
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create();
  }

  /**
   *
   */
  @Get('getAll')
  findAll() {
    return this.taskService.findAll();
  }

  /**
   *
   * @param id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  /**
   *
   * @param id
   * @param updateTaskDto
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id);
  }

  /**
   *
   * @param id
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
