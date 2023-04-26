import { Injectable } from '@nestjs/common';
import { User } from 'src/typeorm/entities/User';
import { UsersService } from 'src/users/services/users/users.service';
import * as bcrypt from 'bcrypt';
import RefreshToken from 'src/auth/entities/refresh-token.entity';
import { sign, verify } from "jsonwebtoken"
@Injectable()
export class AuthService {
    private refreshTokens: RefreshToken[] = [];
    constructor(private readonly userService: UsersService) { }

    async refresh(refreshStr: string): Promise<string | undefined> {
        const refreshToken = await this.retrieveRefseshToken(refreshStr)
        if (!refreshToken) {
            return "not token"
        }

        const user = await this.userService.findOne(refreshToken.id)
        if (!user) {
            return "not user"
        }
        const accesToken = {
            userId: refreshToken.userId,
        }

        return sign(accesToken, process.env.ACCESS_SECRET, { expiresIn: '1h' })
    }

    private retrieveRefseshToken(
        refreshStr: string
    ): Promise<RefreshToken | undefined> {
        try {
            const decoded = verify(refreshStr, process.env.REFRESH_SECRET);
            if (typeof decoded === 'string') {
                return undefined
            }
            return Promise.resolve(
                this.refreshTokens.find((token: RefreshToken) => token.id === decoded.id),
            )
        } catch (e) {
            return undefined
        }
    }
    async login(
        email: string,
        password: string,
        values: { userAgent: string, ipAddres: string },
    ): Promise<{ accesToken: string, refreshToken: string } | { message: string }> {
        const user = await this.userService.findByEmail(email)
        if (!user) {
            return { message: "email not found" }
        }
        if (!user.verify) {
            return { message: "go to email verification" }
        }
        if (!await bcrypt.compare(password, user.password)) {
            return { message: "password is incorrect" }
        }

        return this.newRefreshAsnAccesToken(user, values)
    }

    private async newRefreshAsnAccesToken(
        user: User,
        values: { userAgent: string, ipAddres: string }
    ): Promise<{ accesToken: string, refreshToken: string }> {
        const refreshObject = new RefreshToken({
            id:
                this.refreshTokens.length === 0
                    ? 0
                    : this.refreshTokens[this.refreshTokens.length - 1].id + 1,
            ...values,
            userId: user.id,
        })
        this.refreshTokens.push(refreshObject)
        return {
            refreshToken: refreshObject.sign(),
            accesToken: sign(
                {
                    userId: user.id
                },
                process.env.ACCESS_SECRET,
                {
                    expiresIn: '1h'
                }
            ),

        }
    }

    async logOut(refreshStr: string): Promise<{ message: string }> {
        const refreshToken = await this.retrieveRefseshToken(refreshStr)

        if (!refreshToken) {
            return { message: "not refresh token" }
        }
        //delete retfreshtoken from db
        this.refreshTokens = this.refreshTokens.filter(
            (refreshToken) => refreshToken.id !== refreshToken.id
        );
        return { message: "logout" }
    }
}