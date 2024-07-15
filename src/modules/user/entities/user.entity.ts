import { TeacherCourse } from 'src/modules/course/entities/teacher-course.entity';
import { ForumMessage } from 'src/modules/forum/entities/forum-message.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserType } from './user-type.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  lastName: string;
  @Column()
  password: string;
  @Column({ unique: true })
  email: string;
  @Column({ nullable: true })
  address: string;
  @Column({nullable: true})
  birthday: Date;

  @OneToMany(() => ForumMessage, forumMessage => forumMessage.user)
  forumMessages: ForumMessage[];

  @ManyToOne(() => UserType, (usertype) => usertype.users)
  @JoinColumn({referencedColumnName: 'id', name: 'usertype'})
  usertype: UserType;

  @ManyToMany(() => TeacherCourse)
  @JoinTable({
    name: 'teacher_course_student',
    joinColumn: {
      name: 'student',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'teacherCourse',
      referencedColumnName: 'id',
    },

  })
  teacherCourses: TeacherCourse[];

  @CreateDateColumn()
  createdday: Date;
  @UpdateDateColumn()
  updatedday: Date;
}
