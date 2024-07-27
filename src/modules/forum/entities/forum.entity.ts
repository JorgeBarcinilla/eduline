import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ForumMessage } from './forum-message.entity';

/**
 *
 */
@Entity()
export class Forum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string | null;

  @OneToMany(() => ForumMessage, (forumMessage) => forumMessage.forum)
  messages: ForumMessage[];

  @CreateDateColumn()
  createdday: Date;

  @UpdateDateColumn()
  updatedday: Date | null;
}
