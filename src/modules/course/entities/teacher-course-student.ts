import { User } from 'src/modules/user/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TeacherCourse } from './teacher-course.entity';

/**
 *
 */
@Entity()
export class TeacherCourseStudent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TeacherCourse)
  @JoinColumn({ name: 'teacherCourse' })
  teacherCourse: TeacherCourse;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'student' })
  student: User;
}
