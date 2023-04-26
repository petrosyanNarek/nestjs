import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FreelancerSkill } from 'src/typeorm/entities/FreelancerSkill';
import { Skill } from 'src/typeorm/entities/Skill';
import { Repository } from 'typeorm';

@Injectable()
export class FreelancerSkillService {
    constructor(
        @InjectRepository(FreelancerSkill) private freelancerSkillRepository: Repository<FreelancerSkill>,

    ) { }

    async addFreelancerSkill(freelancerSkill: { skills: Skill[], freelancerId: number }): Promise<void> {
        freelancerSkill.skills.map(skill => {
            return this.freelancerSkillRepository.save({ freelancerId: freelancerSkill.freelancerId, skillId: skill.id })
        })
    }
}
