import { Body, Controller, Get, Post, UseGuards, Req, Logger, UseInterceptors, UploadedFile } from '@nestjs/common';
import { User } from 'src/typeorm/entities/User';
import { UsersService } from 'src/users/services/users/users.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from 'src/mail/serivce/mail/mail.service';
import { verifyUserDto } from 'src/users/dtos/VerifyUser.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Skill } from 'src/typeorm/entities/Skill';
import { FreelancerSkillService } from 'src/freelancer-skill/service/freelancer-skill/freelancer-skill.service';

@Controller('user')
export class UsersController {

    constructor(
        private usersService: UsersService,
        private mailService: MailService,
        private freelancerSkillService: FreelancerSkillService
    ) { }

    @Post("/role")
    async getUserByRole(@Body() getUserRole: { role: boolean, id: number }): Promise<any> {
        return this.usersService.findByRole(getUserRole)
    }


    @Post('/register')
    async registerUser(@Body('userSkills') userSkills: { user: any, skills: Skill[], image: { image: string } }): Promise<{ message: string }> {
        const findUser = await this.usersService.findByEmail(userSkills.user.email)
        if (findUser) {
            return { message: "this mail is already used !!!" }
        }

        const hashedPassword = await bcrypt.hash(userSkills.user.password, 12);
        const token = uuidv4()
        const userRole = userSkills.user.role === "true" ? true : false
        const user = await this.usersService.registerUser({
            ...userSkills.user,
            image: userSkills.image.image,
            role: userRole,
            password: hashedPassword,
            token: token
        })
        await this.mailService.sendUserConfirmation(user, token)
        if (userSkills.skills.length) {
            this.freelancerSkillService.addFreelancerSkill({ freelancerId: user.id, skills: userSkills.skills })
        }
        return { message: "Congratulations, you have successfully registered, please go to the specified email address for verification" }
    }

    @Post('verify')
    async verifyUser(@Body('verifyUser') verifyUser: verifyUserDto): Promise<boolean> {
        const user = await this.usersService.findByToken(verifyUser)
        if (!user) {
            return false
        }
        return await this.usersService.verifyUser(user)

    }

    @UseGuards(JwtAuthGuard)
    @Get('/me')
    async me(@Req() request) {
        const userId = request.user.userId;
        const user = await this.usersService.findOne(userId)
        const { password, verify, ...userDate } = user
        return userDate
    }

    @Post('/hireFreelancer')
    async hireFreelancer(@Body('searchForm') searchForm: { min: number, max: number, skills: Array<number> }): Promise<User[]> {
        return this.usersService.hireFreelancer(searchForm)
    }

    @Post('/freelancer')
    async getFreelancer(@Body('id') id: number): Promise<User> {
        return this.usersService.getFreelancer(id)
    }

    @Post('/update')
    async updateInfo(@Body('updateInfo') updateInfo: { name: string, surname: string, image: { image: string }, id: number }) {
        return this.usersService.updateInfo(updateInfo)
    }

    @Post('/forget')
    async forgetPassword(@Body('email') email: string) {
        const newPass = uuidv4()
        await this.mailService.sendMessage(email, `Password actived code : ${newPass}`)
        const hashedPassword = await bcrypt.hash(newPass, 12);
        await this.usersService.forgotPassword(email, hashedPassword)
    }

    @Post('/editPassword')
    async editPassword(@Body('editPassword') editPassword: { email: string, password: string, newPassword: string }): Promise<boolean> {
        const findUser = await this.usersService.findByEmail(editPassword.email)
        if (!findUser) {
            return false
        }

        if (!(await bcrypt.compare(editPassword.password, findUser.password))) {

            return false
        }

        const newPass = await bcrypt.hash(editPassword.newPassword, 12);
        await this.usersService.editPassword({ ...findUser, password: newPass })

        return true
    }
}
