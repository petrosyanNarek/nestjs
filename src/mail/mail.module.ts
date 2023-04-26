import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './serivce/mail/mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        // host: 'smtp.example.com',
        // secure: false,
        service: 'gmail',
        auth: {
          user: 'sendermail017@gmail.com',
          pass: 'ibccdlzlspsnijml',
        },
      }
    }),
  ],
  providers: [MailService]
})
export class MailModule { }
