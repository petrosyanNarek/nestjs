import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from 'src/typeorm/entities/Skill';
import { Repository } from 'typeorm';

@Injectable()
export class SkillService {
    constructor(
        @InjectRepository(Skill) private skillRepository: Repository<Skill>,

    ) { }

    async getAll(): Promise<Skill[]> {
        return await this.skillRepository.find()
    }
}
