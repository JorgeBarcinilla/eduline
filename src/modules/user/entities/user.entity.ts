import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserType } from './user-type.entity';
import { ForumMessage } from 'src/modules/forum/entities/forum-message.entity';

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

  @CreateDateColumn()
  createdday: Date;
  @UpdateDateColumn()
  updatedday: Date;
}
