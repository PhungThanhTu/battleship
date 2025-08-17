import { Body, Controller, Get, Post, UseGuards, Request } from "@nestjs/common";
import { UserDto } from "src/dtos/user.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { AuthService } from "src/services/auth/auth.service";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("authorize")
    async authorize(@Body() user: UserDto) {
        return await this.authService.authorize(user);
    }

    @UseGuards(AuthGuard)
    @Get("profile")
    getProfile(@Request() req): UserDto {
        const { username } = req.user;

        return { username };
    }
}
