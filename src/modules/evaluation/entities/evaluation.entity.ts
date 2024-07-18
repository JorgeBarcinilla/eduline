import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class Evaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  course: number;

  @Column()
  description: string;

  @CreateDateColumn()
  createdday: Date;

  @UpdateDateColumn()
  updatedday: Date;
}
