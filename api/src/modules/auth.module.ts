import { Module } from "@nestjs/common";
import { AuthConfigModule } from "./auth-config.module";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/models/user.model";
import { AuthController } from "src/controllers/auth/auth.controller";
import { AuthService } from "src/services/auth/auth.service";

@Module({
    imports: [AuthConfigModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
