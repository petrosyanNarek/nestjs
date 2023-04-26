import { Module } from '@nestjs/common';
import { FreelancerWorkService } from './service/freelancer-work/freelancer-work.service';
import { FreelancerWorkController } from './controller/freelancer-work/freelancer-work.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FreelancerWork } from 'src/typeorm/entities/FreelancerWork';
import { MailService } from 'src/mail/serivce/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([FreelancerWork])],
  providers: [FreelancerWorkService, MailService],
  controllers: [FreelancerWorkController]
})
export class FreelancerWorkModule { }
