import { Controller, Post, Body } from '@nestjs/common';
import { FreelancerWorkService } from 'src/freelancer-work/service/freelancer-work/freelancer-work.service';
import { MailService } from 'src/mail/serivce/mail/mail.service';
import { FreelancerWork } from 'src/typeorm/entities/FreelancerWork';
import { Work } from 'src/typeorm/entities/Work';

@Controller('freelancer-work')
export class FreelancerWorkController {
    constructor(
        private freelancerWorkService: FreelancerWorkService,
        private mailService: MailService
    ) { }

    @Post('/new')
    async newFreelancerWork(@Body('freelancerWork') freelancerWork: FreelancerWork): Promise<void> {
        await this.freelancerWorkService.newFreelancerWork(freelancerWork)
    }
    @Post('/doing')
    async getDoing(@Body("freelancerId") freelancerId: number): Promise<Work[]> {
        return this.freelancerWorkService.findDoing(freelancerId)
    }
    @Post('/doingCusstomer')
    async getDoingByCusstomer(@Body("customerId") customerId: number): Promise<any[]> {
        return this.freelancerWorkService.findDoingByCusstomer(customerId)
    }
    @Post('/done')
    async getDone(@Body("freelancerId") freelancerId: number): Promise<Work[]> {
        return this.freelancerWorkService.findDone(freelancerId)
    }
    @Post('/doneCusstomer')
    async getDoneByCusstomer(@Body("customerId") customerId: number): Promise<Work[]> {
        return this.freelancerWorkService.findDoneByCustomer(customerId)
    }
    @Post('/acceptWork')
    async acceptWork(@Body('accapt') accapt: { workId: number, freelancerId: number, email: string, workTitle: string, name: string }): Promise<void> {
        const message = `Dear ${accapt.name} your job application has been accepted by the employer <span> Work Title : ${accapt.workTitle} </span> `
        await this.mailService.sendMessage(accapt.email, message)
        return await this.freelancerWorkService.acceptWork(accapt.workId, accapt.freelancerId)
    }

    @Post('/reject')
    async rejectWork(@Body('rejectF') rejectF: {
        fWorkId: number,
        email: string,
        workTitle: string,
        name: string,
        message: string
    }): Promise<void> {
        const message = `Dear ${rejectF.name} your job application has been rejected by the employer <span> Work Title : ${rejectF.workTitle} , Employer message: ${rejectF.message}</span>  `
        await this.mailService.sendMessage(rejectF.email, message)
        return await this.freelancerWorkService.rejectWork(rejectF.fWorkId)
    }

    // @Post('retingF')
    // async getFreelancerReting(@Body('freelancerId') freelancerId: number) {
    //     await this.freelancerWorkService.getFreelancerReting(freelancerId)
    // }
}
