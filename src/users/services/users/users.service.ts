import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { Between, In, Repository } from "typeorm"
import { User } from 'src/typeorm/entities/User';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { verifyUserDto } from 'src/users/dtos/VerifyUser.dto';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,

    ) { }

    async findOne(id: number): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { id }
        })
    }
    async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOneBy({ email })
    }
    async findByRole(getUserRole: { role: boolean, id: number }): Promise<any> {
        return await this.userRepository.findOne({
            // relations: ['worksCustomer'],
            where: {
                id: getUserRole.id,
                role: getUserRole.role
            }
        })
    }
    async findByToken(verifyUser: verifyUserDto): Promise<User | null> {
        return await this.userRepository.findOneBy({ ...verifyUser })
    }
    async registerUser(user: CreateUserDto): Promise<User> {
        return await this.userRepository.save(user)
    }

    async verifyUser(user: User): Promise<boolean> {
        const userN = await this.userRepository.save({
            ...user,
            verify: true,
            token: null,
            id: user.id
        })
        return true
    }

    async hireFreelancer(searchForm: { min: number, max: number, skills: Array<number> }): Promise<User[]> {

        return this.userRepository.find({
            relations: {
                freelancerSkill: {
                    skill: true
                }
            },
            where: {
                role: false,
                salary: Between(searchForm.min, searchForm.max),
                freelancerSkill: {
                    skill: {
                        id: In(searchForm.skills)
                    }
                }
            },
            select: {
                id: true,
                name: true,
                surname: true,
                salary: true,
                freelancerSkill: {
                    id: true,
                    skill: {
                        value: true
                    }
                }
            }
        })
    }

    async getFreelancer(id: number): Promise<User> {
        return this.userRepository.findOne({
            relations: {
                freelancerSkill: {
                    skill: true
                },
                freelancerWork: {
                    work: {
                        customer: true,
                        comment: true
                    }
                }
            },
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                surname: true,
                salary: true,
                image: true,
                freelancerSkill: {
                    id: true,
                    skill: {
                        value: true
                    }
                },
                freelancerWork: {
                    id: true,

                    work: {
                        id: true,
                        title: true,
                        customer: {
                            name: true,
                            surname: true
                        },

                    }
                }
            }
        })
    }

    async updateInfo(updateInfo: { name: string, surname: string, image: { image: string }, id: number }) {
        const user = await this.userRepository.findOne({
            where: {
                id: updateInfo.id
            }
        })
        const image = user.image
        await fs.unlink(`${image}`, (err) => {
            if (err) {
                return err;
            }
        });
        await this.userRepository.save({ ...user, name: updateInfo.name, surname: updateInfo.surname, image: updateInfo.image.image })
    }

    async forgotPassword(email: string, newPass: string) {
        const user = await this.userRepository.findOneBy({ email })
        await this.userRepository.save({ ...user, password: newPass })
    }

    async editPassword(user: User): Promise<void> {
        await this.userRepository.save(user)
    }
}
