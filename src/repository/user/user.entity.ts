import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
   id: number
   @Column()
   name: string
   @Column()
   lastName: string
   @Column()
   password: string
   @Column({unique: true})
   email: string
   @Column({nullable: true})
   address: string
   @Column()
   birthday: Date
   @Column()
   usertype: number
   @CreateDateColumn()
   createdday: Date
   @UpdateDateColumn()
   updatedday: Date
}