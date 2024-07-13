import { File } from "src/modules/file/entities/file.entity";
import { CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class TaskStudent{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => File)
    @JoinTable({
        name: 'file_task_student',
        joinColumn:{
            name: 'taskStudent',
            foreignKeyConstraintName: 'FK_file_task_student_task_student'
        },
        inverseJoinColumn:{
            name: 'file',
            foreignKeyConstraintName:'FK_file_task_student_file'
        }

    })
    files:Array<File>

    task: number

    teacherCourseStudent: number

    @CreateDateColumn()
    createdday: Date

    @UpdateDateColumn()
    updatedday: Date
}