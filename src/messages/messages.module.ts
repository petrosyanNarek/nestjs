import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { Message } from 'src/typeorm/entities/Messages';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientToUser } from 'src/typeorm/entities/ClientToUser';

@Module({
  imports: [TypeOrmModule.forFeature([Message, ClientToUser])],
  providers: [MessagesGateway, MessagesService]
})
export class MessagesModule { }
