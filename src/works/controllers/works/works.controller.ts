import { Body, Controller, Get, Post } from '@nestjs/common';
import { Work } from 'src/typeorm/entities/Work';
import { WorkDto } from 'src/works/dtos/new-work.dto';
import { WorksService } from 'src/works/services/works/works.service';

@Controller('works')
export class WorksController {
    constructor(
        private worksService: WorksService,
    ) { }

    @Post("/add")
    async addNewWork(@Body('work') work: WorkDto): Promise<void> {
        console.log(work);

        await this.worksService.addNewWork(work);
    }
    @Post('/finish')
    async finishWork(@Body('work') work: Work): Promise<void> {
        await this.worksService.finishWork(work)
    }

    @Get("/getAll")
    async getAllWork(): Promise<Work[]> {
        return await this.worksService.findAll()
    }

    @Post('/getAllCusstomerWork')
    async findByCustomer(@Body('customerId') customerId: number): Promise<Work[]> {
        return await this.worksService.findByCustomer(customerId)
    }
    @Post('/one')
    async getOne(@Body('id') id: number): Promise<Work> {
        return await this.worksService.findById(id)
    }


    @Post("/getDoneByCusstomer")
    async getDoneByCusstomer(@Body() customerId: number): Promise<Work[]> {
        return this.worksService.findDoneByCusstomerID(customerId)
    }

}
