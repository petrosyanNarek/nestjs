import { PrimaryGeneratedColumn, Entity, Column, OneToMany, JoinColumn, OneToOne } from "typeorm"
import { FreelancerSkill } from "./FreelancerSkill"
import { FreelancerWork } from "./FreelancerWork"
import { Message } from "./Messages"
import { Work } from "./Work"
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    surname: string

    @Column({ default: null })
    salary: number

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    role: boolean

    @Column({ default: false })
    verify: boolean

    @Column({ default: null })
    token: string

    @Column({ default: null })
    image: string

    @OneToMany(() => FreelancerSkill, (freelancerSkill) => freelancerSkill.freelancer)
    public freelancerSkill !: FreelancerSkill[]

    @OneToMany(() => FreelancerWork, (freelancerWork) => freelancerWork.freelancer)
    public freelancerWork !: FreelancerWork[]

    @OneToMany(() => Work, (work) => work.customer)
    public work !: Work[]

    @OneToMany(() => Message, (message) => message.from)
    public fromMessage !: Message[]

    @OneToMany(() => Message, (message) => message.to)
    public toMessage !: Message[]

}
