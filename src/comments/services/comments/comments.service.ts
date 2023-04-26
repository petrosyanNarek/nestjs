import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/typeorm/entities/Comment';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    ) { }

    async addNewComment(comment: Comment): Promise<void> {
        await this.commentRepository.save(comment)
    }

    async getRatingWork(workId: number): Promise<number> {
        const ratings = await this.commentRepository.find({
            where: {
                workId
            },
            select: {
                rating: true
            }
        })
        const arr = ratings.map(r => r.rating)

        return arr.length ? arr.reduce((a, v) => a + v) / ratings.length : 0

    }

    async getRatingFreelancer(freelancerId: number): Promise<number> {
        const ratings = await this.commentRepository.find({
            relations: {
                work: {
                    freelancerWork: true
                }
            },
            where: {
                work: {
                    freelancerWork: {
                        freelancerId
                    }
                }
            },
            select: {
                rating: true
            }
        })
        const arr = ratings.map(r => r.rating)

        return arr.length ? arr.reduce((a, v) => a + v) / ratings.length : 0

    }
}
