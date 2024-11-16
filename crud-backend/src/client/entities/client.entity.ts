import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    wage: number

    @Column()
    enterprise: number
}