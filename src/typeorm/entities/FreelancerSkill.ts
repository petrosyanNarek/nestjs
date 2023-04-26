import { PrimaryGeneratedColumn, Entity, Column, ManyToMany, ManyToOne, JoinTable } from "typeorm"
import { Skill } from "./Skill"
import { User } from "./User"
@Entity()
export class FreelancerSkill {

    @PrimaryGeneratedColumn()
    id !: number

    @Column()
    freelancerId !: number

    @Column()
    skillId !: number

    @ManyToOne(() => User, (freelancer) => freelancer.freelancerSkill, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'

    })
    @JoinTable()
    public freelancer: User

    @ManyToOne(() => Skill, (skill) => skill.freelancerSkill, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinTable()
    public skill: Skill
}
