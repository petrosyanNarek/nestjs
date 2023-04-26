import { BlockList } from "net"

export class CreateUserDto {
    name: string
    surname: string
    email: string
    password: string
    role: boolean
    verify: boolean
    token: string
    image: string
}