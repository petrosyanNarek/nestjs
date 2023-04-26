import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from "typeorm"
import { FreelancerSkill } from "./FreelancerSkill"
@Entity()
export class Skill {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    value: string

    @Column()
    label: string

    @OneToMany(() => FreelancerSkill, (freelancerSkill) => freelancerSkill.skill)
    public freelancerSkill !: FreelancerSkill[]
}
