import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

/**
 *
 */
@Entity()
export class UserType {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.usertype)
  @JoinColumn({ referencedColumnName: 'id', name: 'usertype' })
  users: User[];

  @CreateDateColumn()
  createdday: Date;
  @UpdateDateColumn()
  updatedday: Date;
}
