import { Module } from '@nestjs/common';
import { SkillService } from './service/skill/skill.service';
import { SkillController } from './controller/skill/skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from 'src/typeorm/entities/Skill';

@Module({
  imports: [TypeOrmModule.forFeature([Skill])],
  providers: [SkillService],
  controllers: [SkillController]
})
export class SkillModule { }
