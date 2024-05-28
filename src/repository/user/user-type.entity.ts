import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class UserType {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @CreateDateColumn()
    createdday: Date
    @UpdateDateColumn()
    updatedday: Date
}