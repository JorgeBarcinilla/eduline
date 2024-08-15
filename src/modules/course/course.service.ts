import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseState } from './entities/course-state.entity';
import { Course } from './entities/course.entity';
import { TeacherCourse } from './entities/teacher-course.entity';

/**
 *
 */
@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(CourseState)
    private courseStateRepository: Repository<CourseState>,
    @InjectRepository(TeacherCourse)
    private teacherCourseRepository: Repository<TeacherCourse>
  ) {}

  /**
   * Metodo para crear un curso
   * @param {CreateCourseDto} createCourseDto - Datos del curso a crear
   * @returns {Promise<Course>} - Curso creado
   */
  create(createCourseDto: CreateCourseDto) {
    return this.courseRepository.save(createCourseDto);
  }

  /**
   * Metodo para obtener todos los cursos
   * @param {FindOptionsWhere<Course> | FindOptionsWhere<Course>[]} where - Condiciones de busqueda
   * @returns {Promise<Course[]>} - Cursos encontrados
   */
  findAll(where?: FindOptionsWhere<Course> | FindOptionsWhere<Course>[]): Promise<Course[]> {
    return this.courseRepository.find({ where, relations: ['state'] });
  }

  /**
   * Metodo para obtener un curso
   * @param {number} id - Id del curso a buscar
   * @returns {Promise<Course>} - Curso encontrado
   */
  findOne(id: number): Promise<Course> {
    return this.courseRepository.findOne({ where: { id } });
  }

  /**
   * Metodo para actualizar un curso
   * @param {number} id - Id del curso a actualizar
   * @param {UpdateCourseDto} updateCourseDto - Datos del curso a actualizar
   * @returns {Promise<boolean>} - Resultado de la actualización
   */
  update(id: number, updateCourseDto: UpdateCourseDto): Promise<boolean> {
    return this.courseRepository.update(id, updateCourseDto).then((result: UpdateResult) => result.affected > 0);
  }

  /**
   * Metodo para eliminar un curso
   * @param {number} id - Id del curso a eliminar
   * @returns {Promise<boolean>} - Resultado de la eliminación
   */
  remove(id: number): Promise<boolean> {
    return this.courseRepository.delete(id).then((result: UpdateResult) => result.affected > 0);
  }

  /**
   * Metodo para obtener los estados de los cursos
   * @returns {Promise<CourseState[]>} - Estados de los cursos
   */
  findStates(): Promise<CourseState[]> {
    return this.courseStateRepository.find({ relations: ['courses'] });
  }

  /**
   * Metodo para obtener los cursos de un profesor
   * @param {FindOptionsWhere<TeacherCourse> | FindOptionsWhere<TeacherCourse>[]} where - Condiciones de busqueda
   * @returns {Promise<TeacherCourse[]>} - Cursos encontrados
   */
  findTeacherCourses(
    where?: FindOptionsWhere<TeacherCourse> | FindOptionsWhere<TeacherCourse>[]
  ): Promise<TeacherCourse[]> {
    return this.teacherCourseRepository.find({
      where,
      relations: ['course', 'teacher', 'students']
    });
  }
}
