import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, OneToMany, JoinTable } from "typeorm"
import { Comment } from "./Comment"
import { FreelancerWork } from "./FreelancerWork"
import { User } from "./User"

@Entity()
export class Work {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column("text")
    description: string

    @Column()
    price: number

    @Column()
    customerId: number

    @Column({ default: false })
    done: boolean

    @ManyToOne(() => User, (customer) => customer.work, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinTable()
    public customer: User

    @OneToMany(() => FreelancerWork, (freelancerWork) => freelancerWork.work)
    public freelancerWork !: FreelancerWork[]

    @OneToMany(() => Comment, (comment) => comment.work)
    public comment !: Comment[]
}
