import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
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

  @ManyToOne(() => UserType, (usertype) => usertype.users)
  @JoinColumn({referencedColumnName: 'id', name: 'usertype'})
  usertype: UserType;

  @CreateDateColumn()
  createdday: Date;
  @UpdateDateColumn()
  updatedday: Date;
}
