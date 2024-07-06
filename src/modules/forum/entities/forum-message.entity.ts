import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Forum } from "./forum.entity";
import { User } from "src/modules/user/entities/user.entity";

@Entity()
export class ForumMessage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @ManyToOne(() => Forum, forum => forum.messages)
    @JoinColumn()
    forum: Forum;

    @ManyToOne(() => User, user => user.forumMessages)
    @JoinColumn()
    user: User;

    @CreateDateColumn()
    createdday: Date

    @UpdateDateColumn()
    updatedday: Date

    
}