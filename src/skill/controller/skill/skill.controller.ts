import { Controller, Get, Post } from '@nestjs/common';
import { SkillService } from 'src/skill/service/skill/skill.service';
import { Skill } from 'src/typeorm/entities/Skill';

@Controller('skill')
export class SkillController {
    constructor(
        private skillService: SkillService,
    ) { }

    @Get("/all")
    async getAllSkill(): Promise<Skill[]> {
        console.log(';');

        return this.skillService.getAll()
    }
}
