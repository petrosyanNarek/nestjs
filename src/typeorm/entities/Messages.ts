import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    message: string

    @Column()
    fromId: number

    @Column()
    toId: number

    @ManyToOne(() => User, (from) => from.fromMessage, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinTable()
    public from: User

    @ManyToOne(() => User, (to) => to.toMessage, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinTable()
    public to: User
}