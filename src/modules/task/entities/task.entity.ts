import { CommonEntity } from 'src/common/entity/common.entity';
import { TeacherCourse } from 'src/modules/course/entities/teacher-course.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStudent } from './task-student.entity';

/**
 *
 */
@Entity()
export class Task extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TeacherCourse)
  @JoinColumn({ name: 'teacherCourse' })
  teacherCourse: TeacherCourse;

  @OneToMany(() => TaskStudent, (taskStudent) => taskStudent.task)
  @JoinColumn({ name: 'task' })
  answers: Array<TaskStudent>;

  @Column()
  description: string;

  @Column()
  deadline: Date;
}
