import { TeacherCourse } from "src/modules/course/entities/teacher-course.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TaskStudent } from "./task-student.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>TeacherCourse)
    @JoinColumn({name: 'teacherCourse'})
    teacherCourse: TeacherCourse

    @OneToMany(()=>TaskStudent, (taskStudent) => taskStudent.task)
    @JoinColumn({name: 'task'})
    answers: Array<TaskStudent>

    @Column()
    description: string   

    @Column()
    deadline: Date
    

}
