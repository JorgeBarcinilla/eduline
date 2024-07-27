import { TaskStudent } from 'src/modules/task/entities/task-student.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 *
 */
@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  extension: string;

  @Column()
  size: number;

  @ManyToMany(() => TaskStudent)
  @JoinTable({
    name: 'file_task_student',
    joinColumn: {
      name: 'file',
      foreignKeyConstraintName: 'file_task_student_file_id_fk',
    },
    inverseJoinColumn: {
      name: 'taskStudent',
      foreignKeyConstraintName: 'file_task_student_task_student_id_fk',
    },
  })
  taskStudents: Array<TaskStudent>;

  @CreateDateColumn()
  createdday: Date;

  @UpdateDateColumn()
  updatedday: Date;
}
