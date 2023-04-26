import { Controller, Post, Body } from '@nestjs/common';
import { FreelancerSkillService } from 'src/freelancer-skill/service/freelancer-skill/freelancer-skill.service';
import { Skill } from 'src/typeorm/entities/Skill';

@Controller('freelancerSkill')
export class FreelancerSkillController {
    constructor(
        private freelancerSkillService: FreelancerSkillService,
    ) { }
    @Post('/add')
    async addFreelancerSkill(@Body() freelancerSkill: { skills: Skill[], freelancerId: number }): Promise<void> {
        await this.freelancerSkillService.addFreelancerSkill(freelancerSkill)
    }
}
