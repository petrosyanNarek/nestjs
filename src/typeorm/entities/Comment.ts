import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, JoinColumn, JoinTable, CreateDateColumn } from "typeorm"
import { Work } from "./Work"

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    rating: number

    @Column({ type: "text" })
    message: string

    @Column()
    cusstomerId: number

    @Column()
    workId: number

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Work, (work) => work.comment, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    public work: Work

}
