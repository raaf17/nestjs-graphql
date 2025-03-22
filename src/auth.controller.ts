import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth/auth.service";
import { LocalAuthGuard } from "./auth/guards/local-auth.guard";
import { Request } from "express";
import { User } from "./users/models/user";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @UseGuards(JwtAuthGuard)
    login(@Req() req: Request): { access_token: string } {
        return this.authService.login(req.user as User)
    }
}