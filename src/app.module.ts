import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { WorksModule } from './works/works.module';
import { CommentsModule } from './comments/comments.module';
import { Work } from './typeorm/entities/Work';
import { Comment } from './typeorm/entities/Comment';
import { Skill } from './typeorm/entities/Skill';
import { FreelancerSkill } from './typeorm/entities/FreelancerSkill';
import { FreelancerWork } from './typeorm/entities/FreelancerWork';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from "@nestjs/config"
import { SkillModule } from './skill/skill.module';
import { FreelancerSkillModule } from './freelancer-skill/freelancer-skill.module';
import { FreelancerWorkModule } from './freelancer-work/freelancer-work.module';
import { UploadController } from './image-upload/controller/upload/upload.controller';
import { GatewayModule } from './gateway/gateway.module';
import { MessagesModule } from './messages/messages.module';
import { Message } from './typeorm/entities/Messages';
import { ClientToUser } from './typeorm/entities/ClientToUser';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'freelancer_customer',
    entities: [User, Work, Comment, Skill, FreelancerSkill, FreelancerWork, Message, ClientToUser],
    synchronize: true
  }), UsersModule,
    WorksModule,
    CommentsModule,
    MailModule,
    AuthModule,
  ConfigModule.forRoot(),
    SkillModule,
    FreelancerSkillModule,
    FreelancerWorkModule,
    GatewayModule,
    MessagesModule,
  ],
  controllers: [AppController, UploadController],
  providers: [AppService],
})
export class AppModule { }
