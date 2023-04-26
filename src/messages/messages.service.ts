import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientToUser } from 'src/typeorm/entities/ClientToUser';
import { Message } from 'src/typeorm/entities/Messages';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { FindMessageDto } from './dto/find-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(ClientToUser) private clientToUserRepository: Repository<ClientToUser>,


  ) { }

  async identify(name: string, clientId: string) {
    await this.clientToUserRepository.save({ name, clientId })

    return await this.clientToUserRepository.find({
      select: {
        name: true
      }
    })
  }

  async getClientName(clientId: string) {
    return await this.clientToUserRepository.findOne({
      where: {
        clientId
      },
      select: {
        name: true
      }
    })
  }

  async create(createMessageDto: CreateMessageDto) {
    return await this.messageRepository.save(createMessageDto)
  }

  findAll(findMessageDto: FindMessageDto) {
    return this.messageRepository.findBy(findMessageDto)
  }

}
