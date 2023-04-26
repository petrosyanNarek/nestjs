import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { title } from 'process';
import { FreelancerWork } from 'src/typeorm/entities/FreelancerWork';
import { Work } from 'src/typeorm/entities/Work';
import { Repository } from 'typeorm';

@Injectable()
export class FreelancerWorkService {
    constructor(
        @InjectRepository(FreelancerWork) private freelancerWorkRepository: Repository<FreelancerWork>,

    ) { }

    async newFreelancerWork(freelancerWork: FreelancerWork): Promise<any> {
        const fWork = await this.freelancerWorkRepository.findOneBy({ freelancerId: freelancerWork.freelancerId, workId: freelancerWork.workId })
        if (!fWork) {
            await this.freelancerWorkRepository.save(freelancerWork)
        }
    }
    async findDoing(freelancerId: number): Promise<any[]> {
        const freelancerWorks = await this.freelancerWorkRepository.find({
            relations: {
                work: true
            },
            where: {
                freelancerId,
                application: true,
                work: {
                    done: false
                },


            }
        })
        return freelancerWorks
    }

    async findDoingByCusstomer(customerId: number): Promise<any[]> {
        const freelancerWorks = await this.freelancerWorkRepository.find({
            relations: {
                work: true,
                freelancer: true

            },
            where: {
                application: false,
                work: {
                    customerId,
                    done: false
                }
            },
            select: {
                id: true,
                freelancer: {
                    id: true,
                    name: true,
                    surname: true,
                    email: true
                },
                work: {
                    id: true,
                    title: true,
                    description: true,
                    price: true
                }

            }
        })
        return freelancerWorks
    }

    async findDone(freelancerId: number): Promise<Work[]> {
        const freelancerWorks = await this.freelancerWorkRepository.find({
            relations: {
                work: true
            },
            where: {
                freelancerId,
                work: {
                    done: true
                }
            }
        })
        return freelancerWorks.map((w) => w.work)
    }

    async findDoneByCustomer(customerId: number): Promise<Work[]> {
        const freelancerWorks = await this.freelancerWorkRepository.find({
            relations: {
                work: true
            },
            where: {
                work: {
                    customerId,
                    done: true,
                }
            }
        })
        return freelancerWorks.map((w) => w.work)
    }

    async acceptWork(workId: number, freelancerId: number): Promise<void> {
        const freelancerWork = await this.freelancerWorkRepository.findOne({
            where: {
                workId,
                freelancerId
            }

        })
        await this.freelancerWorkRepository.save({ ...freelancerWork, application: true })
    }

    async rejectWork(id: number): Promise<void> {
        await this.freelancerWorkRepository.delete({
            id
        })
    }

    // async getFreelancerReting(freelancerId: number) {
    //     const work = await this.freelancerWorkRepository.find({
    //         relations: {
    //             work: {
    //                 comment: true
    //             }
    //         },
    //         where: {
    //             freelancerId
    //         },
    //         select: {
    //             id: true,
    //             work: {
    //                 id: true,
    //                 comment: {
    //                     id: true,
    //                     rating: true
    //                 }
    //             }
    //         }
    //     })
    //     console.log(work.filter(v => v.work.comment.length).map((v, i) => v.work.comment[i].rating).reduce((aggr, val) => aggr + val));

    // }

}
