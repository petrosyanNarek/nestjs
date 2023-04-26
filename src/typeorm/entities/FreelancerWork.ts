import { PrimaryGeneratedColumn, Entity, Column, ManyToMany, OneToMany, ManyToOne, JoinColumn, JoinTable } from "typeorm"
import { Comment } from "./Comment"
import { Skill } from "./Skill"
import { User } from "./User"
import { Work } from "./Work"
@Entity()
export class FreelancerWork {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    freelancerId: number

    @Column()
    workId: number

    @Column({ default: false })
    application: boolean


    @ManyToOne(() => User, (freelancer) => freelancer.freelancerWork, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinTable()
    public freelancer: User[]

    @ManyToOne(() => Work, (work) => work.freelancerWork, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinTable()
    public work: Work
}