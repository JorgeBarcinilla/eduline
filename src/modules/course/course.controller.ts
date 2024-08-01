import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthTokenPayload } from '../auth/dto/login.dto';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

/**
 *
 */
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  /**
   *
   * @param createCourseDto
   */
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  /**
   *
   */
  @Get('getAll')
  @UseGuards(AuthGuard)
  findAll() {
    return this.courseService.findAll();
  }

  /**
   *
   */
  @Get('states')
  findStates() {
    return this.courseService.findStates();
  }

  /**
   *
   * @param request
   * @param request.user
   */
  @Get('getMyCourses')
  @UseGuards(AuthGuard)
  getMyCourses(@Request() request: Request) {
    const payload = request['payload'] as AuthTokenPayload;
    return this.courseService.findTeacherCourses({
      students: { id: payload.id },
    });
  }

  /**
   *
   */
  @Get('teacherCourses')
  findTeacherCourses() {
    return this.courseService.findTeacherCourses();
  }

  /**
   *
   * @param id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  /**
   *
   * @param id
   * @param updateCourseDto
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  /**
   *
   * @param id
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
