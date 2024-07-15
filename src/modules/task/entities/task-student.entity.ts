import { File } from "src/modules/file/entities/file.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Task } from "./task.entity";

@Entity()
export class TaskStudent{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => File)
    @JoinTable({
        name: 'file_task_student',
        joinColumn:{
            name: 'taskStudent',
            foreignKeyConstraintName: 'file_task_student_task_student_id_fk'
        },
        inverseJoinColumn:{
            name: 'file',
            foreignKeyConstraintName:'file_task_student_file_id_fk'
        }

    })
    files:Array<File>

    @ManyToOne(() => Task)
    @JoinColumn({name: 'task'})
    task: Task

    @ManyToOne(() => User)
    @JoinColumn({name: 'student'})
    student: User

    @Column({nullable: true})
    grade: number | null

    @CreateDateColumn()
    createdday: Date

    @UpdateDateColumn()
    updatedday: Date
}