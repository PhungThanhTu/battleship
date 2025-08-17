import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule.forRoot()],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>("MONGO")
            }),
            inject: [ConfigService]
        })
    ],
    exports: []
})
export class MongoModule {}
