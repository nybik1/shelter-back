import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/pet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pet } from 'src/schemas/pet.schema';
import { Model } from 'mongoose';

@Injectable()
export class PetsService {
  constructor(@InjectModel(Pet.name) private catModel: Model<Pet>) {}

  async getAll() {
    const cats = await this.catModel.find({});
    return cats;
  }
  async getById(id: string) {
    const cat = await this.catModel.findById(id);
    if (cat) {
      return cat;
    } else {
      throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
    }
  }
  async create(catDto: CreateCatDto) {
    const newCat = new this.catModel(catDto);
    const createdCat = await newCat.save();
    return createdCat;
  }
}
