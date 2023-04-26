import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Work } from 'src/typeorm/entities/Work';
import { WorksController } from './controllers/works/works.controller';
import { WorksService } from './services/works/works.service';

@Module({
  imports: [TypeOrmModule.forFeature([Work])],
  controllers: [WorksController],
  providers: [WorksService]
})
export class WorksModule { }
