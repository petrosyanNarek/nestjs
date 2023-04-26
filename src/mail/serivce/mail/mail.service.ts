import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/typeorm/entities/User';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendUserConfirmation(user: User, token: string) {
        const url = `http://localhost:4200/verify?email=${user.email}&token=${token}`;

        await this.mailerService.sendMail({
            to: user.email,
            from: "sendermail017@gmail.com",
            html: `<h2>Hay dear ${user.name} ${user.surname} plase </h2><a href=${url}>Click to verify your account</a>`,
        });
    }
    async sendMessage(email: string, message: string) {
        await this.mailerService.sendMail({
            to: email,
            from: "sendermail017@gmail.com",
            html: `<h2>${message}</h2>`
        })
    }
}
