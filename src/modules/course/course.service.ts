import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
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
    private teacherCourseRepository: Repository<TeacherCourse>,
  ) {}

  /**
   *
   * @param createCourseDto
   */
  create(createCourseDto: CreateCourseDto) {
    return this.courseRepository.save(createCourseDto);
  }

  /**
   *
   * @param where
   */
  findAll(where?: FindOptionsWhere<Course> | FindOptionsWhere<Course>[]) {
    return this.courseRepository.find({ where, relations: ['state'] });
  }

  /**
   *
   * @param id
   */
  findOne(id: number) {
    return this.courseRepository.findOne({ where: { id } });
  }

  /**
   *
   * @param id
   * @param updateCourseDto
   */
  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.courseRepository.update(id, updateCourseDto);
  }

  /**
   *
   * @param id
   */
  remove(id: number) {
    return this.courseRepository.delete(id);
  }

  /**
   *
   */
  findStates() {
    return this.courseStateRepository.find({ relations: ['courses'] });
  }

  /**
   *
   * @param where
   */
  findTeacherCourses(
    where?: FindOptionsWhere<TeacherCourse> | FindOptionsWhere<TeacherCourse>[],
  ) {
    return this.teacherCourseRepository.find({
      where,
      relations: ['course', 'teacher', 'students'],
    });
  }
}
