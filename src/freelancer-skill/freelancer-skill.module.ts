import { Module } from '@nestjs/common';
import { FreelancerSkillService } from './service/freelancer-skill/freelancer-skill.service';
import { FreelancerSkillController } from './controller/freelancer-skill/freelancer-skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FreelancerSkill } from 'src/typeorm/entities/FreelancerSkill';

@Module({
  imports: [TypeOrmModule.forFeature([FreelancerSkill])],
  providers: [FreelancerSkillService],
  controllers: [FreelancerSkillController]
})
export class FreelancerSkillModule { }
