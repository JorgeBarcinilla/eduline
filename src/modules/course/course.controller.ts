import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AuthTokenPayloadValidateInfo } from '../auth/dto/login.dto';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseState } from './entities/course-state.entity';
import { Course } from './entities/course.entity';
import { TeacherCourse } from './entities/teacher-course.entity';

/**
 *
 */
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  /**
   * Endpoint para crear un curso
   * @param {CreateCourseDto} createCourseDto - Datos del curso a crear
   * @returns {Promise<Course>} - Curso creado
   */
  @Post()
  create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.courseService.create(createCourseDto);
  }

  /**
   * Endpoint para obtener todos los cursos
   * @returns {Promise<Course[]>} - Cursos encontrados
   */
  @Get('getAll')
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  /**
   * Endpoint para obtener los estados de los cursos
   * @returns {Promise<CourseState[]>} - Estados de los cursos
   */
  @Get('states')
  findStates(): Promise<CourseState[]> {
    return this.courseService.findStates();
  }

  /**
   * Endpoint para obtener los cursos de un estudiante
   * @param {Request} request - Request de la petición
   * @returns {Promise<TeacherCourse[]>} - Cursos del estudiante
   */
  @Get('getMyCourses')
  @UseGuards(JwtAuthGuard)
  getMyCourses(@Req() request: Request): Promise<TeacherCourse[]> {
    const info = request.user['info'] as AuthTokenPayloadValidateInfo;
    return this.courseService.findTeacherCourses({
      students: { id: info.id }
    });
  }

  /**
   * Endpoint para obtener los cursos de un profesor
   * @returns {Promise<TeacherCourse[]>} - Cursos del profesor
   */
  @Get('teacherCourses')
  findTeacherCourses(): Promise<TeacherCourse[]> {
    return this.courseService.findTeacherCourses();
  }

  /**
   * Endpoint para obtener un curso
   * @param {string} id - Id del curso a buscar
   * @returns {Promise<Course>} - Curso encontrado
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Course> {
    return this.courseService.findOne(+id);
  }

  /**
   * Endpoint para actualizar un curso
   * @param {string} id - Id del curso a actualizar
   * @param {UpdateCourseDto} updateCourseDto - Datos del curso a actualizar
   * @returns {Promise<boolean>} - Resultado de la actualización
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto): Promise<boolean> {
    return this.courseService.update(+id, updateCourseDto);
  }

  /**
   * Endpoint para eliminar un curso
   * @param {string} id - Id del curso a eliminar
   * @returns {Promise<boolean>} - Resultado de la eliminación
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.courseService.remove(+id);
  }
}
