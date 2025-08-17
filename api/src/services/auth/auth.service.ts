import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CredentialDto } from "src/dtos/credential.dto";
import { UserDto } from "src/dtos/user.dto";
import { User } from "src/models/user.model";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ) {}

    async authorize(userDto: UserDto): Promise<CredentialDto> {
        const { username } = userDto;
        console.log(userDto);
        const user = await this.userModel.findOne({
            username
        });

        if (!user) {
            await this.createNewUser(username);
        }

        const payload = { username };

        const token = await this.jwtService.signAsync(payload);

        return {
            token
        };
    }

    async getUserFromToken(credentialDto: CredentialDto): Promise<UserDto> {
        const { token } = credentialDto;

        try {
            const payload = await this.jwtService.verifyAsync(token);
            return payload;
        } catch {
            throw new UnauthorizedException();
        }
    }

    private async createNewUser(username: string) {
        const user: User = {
            username
        };
        const newUser = new this.userModel(user);
        await newUser.save();
    }
}
