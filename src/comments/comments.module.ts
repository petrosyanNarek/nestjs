import { Module } from '@nestjs/common';
import { CommentsService } from './services/comments/comments.service';
import { CommentsController } from './controllers/comments/comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/typeorm/entities/Comment';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule { }
