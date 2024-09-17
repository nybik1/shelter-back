import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PetsModule } from "./pets/pets.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { UploadModule } from "./upload/upload.module";
import { FileController } from "./file/file.controller";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot("mongodb://localhost/shelter"),
    PetsModule,
    UsersModule,
    AuthModule,
    UploadModule,
  ],
  controllers: [AppController, FileController],
  providers: [AppService],
})
export class AppModule {}
