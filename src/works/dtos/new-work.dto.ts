import { IsBoolean, IsNumber, IsString } from "class-validator"

export class WorkDto {
    @IsString()
    title: string
    @IsString()
    description: string
    @IsNumber()
    customerId: number
}