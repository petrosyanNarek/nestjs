import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Work } from 'src/typeorm/entities/Work';
import { WorkDto } from 'src/works/dtos/new-work.dto';
import { Repository } from 'typeorm';

@Injectable()
export class WorksService {
    constructor(
        @InjectRepository(Work) private workRepository: Repository<Work>,

    ) { }

    async addNewWork(work: WorkDto): Promise<Work> {
        return await this.workRepository.save(work)
    }

    async findAll(): Promise<Work[]> {
        return await this.workRepository.find({
            where: {
                done: false
            }
        })
    }
    async findByCustomer(customerId: number): Promise<Work[]> {
        return await this.workRepository.find({
            where: {
                customerId,
                done: false
            }
        })
    }
    async findById(id: number): Promise<Work> {
        return await this.workRepository.findOne({
            where: {
                id
            },
            relations: {
                customer: true,
                comment: true,
            },
            select: {
                id: true,
                title: true,
                description: true,
                customer: {
                    id: true,
                    name: true,
                    surname: true,
                    email: true,
                }
            },
        })
    }


    async findDoneByCusstomerID(customerId: number): Promise<Work[]> {
        return await this.workRepository.find({
            where: {
                customerId,
                done: true
            }
        })
    }
    async finishWork(work: Work): Promise<void> {
        await this.workRepository.save({
            ...work,
            done: true
        })
    }
    async deleteWork(id: number): Promise<void> {
        await this.workRepository.delete(id)
    }
}
