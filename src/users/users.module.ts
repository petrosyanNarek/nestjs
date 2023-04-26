import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FreelancerSkillService } from 'src/freelancer-skill/service/freelancer-skill/freelancer-skill.service';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/serivce/mail/mail.service';
import { FreelancerSkill } from 'src/typeorm/entities/FreelancerSkill';
import { User } from 'src/typeorm/entities/User';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
@Module({
  imports:
    [
      MailModule,
      TypeOrmModule.forFeature([User, FreelancerSkill]),
    ],
  controllers: [UsersController],
  providers: [UsersService, MailService, FreelancerSkillService],
  exports: [UsersService]
})
export class UsersModule { }
