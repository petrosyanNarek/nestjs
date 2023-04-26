import { Controller, Request, Post, UseGuards, Req, Ip, Body, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RefreshTokenDto } from 'src/auth/dto/refresh-token.dto';
import { AuthService } from 'src/auth/serivce/auth/auth.service';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Req() request, @Ip() ip: string, @Body('loginUser') loginUser: LoginDto) {
        return this.authService.login(loginUser.email, loginUser.password, {
            ipAddres: ip,
            userAgent: request.headers['user-agent']
        })
    }

    @Post('refresh')
    async refreshToken(@Body() body: RefreshTokenDto) {
        return this.authService.refresh(body.refreshToken)
    }

    @Post('logout')
    async logout(@Body() body: RefreshTokenDto) {
        return this.authService.logOut(body.refreshToken)
    }
}