import { Body, Controller, Post } from '@nestjs/common';
import { CommentsService } from 'src/comments/services/comments/comments.service';
import { Comment } from 'src/typeorm/entities/Comment';

@Controller('comments')
export class CommentsController {
    constructor(
        private commentService: CommentsService,
    ) { }

    @Post('/new')
    async newCom(@Body('comment') comment: Comment): Promise<void> {
        await this.commentService.addNewComment(comment)
    }

    @Post('/rating')
    async getRating(@Body('workId') workId: number): Promise<number> {
        return this.commentService.getRatingWork(workId)
    }

    @Post('/ratingF')
    async getRatingFreelancer(@Body('freelancerId') freelancerId: number): Promise<number> {
        return this.commentService.getRatingFreelancer(freelancerId)
    }
}
