import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, CatSchema } from '../schemas/pet.schema';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Pet.name, schema: CatSchema }]),
  ],
  providers: [PetsService],
  controllers: [PetsController],
  exports: [UsersModule],
})
export class PetsModule {}
