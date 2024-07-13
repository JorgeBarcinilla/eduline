import { TaskStudent } from "src/modules/task/entities/task-student.entity";
import { Task } from "src/modules/task/entities/task.entity";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn()
    createdday: Date

    @UpdateDateColumn()
    updatedday: Date


}
