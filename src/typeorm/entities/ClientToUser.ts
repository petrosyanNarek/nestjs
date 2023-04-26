import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ClientToUser {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    clientId: string
}
