import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateCatDto } from "./dto/pet.dto";
import { PetsService } from "./pets.service";
import { Pet } from "src/schemas/pet.schema";

@Controller("pets")
export class PetsController {
  constructor(private readonly petsService: PetsService) {}
  @Get()
  async getAllCats(): Promise<Pet[]> {
    return this.petsService.getAll();
  }

  @Get(":id")
  async getCatById(@Param("id") id: string): Promise<Pet> {
    return this.petsService.getById(id);
  }
  @Post()
  async createCat(@Body() catToCreate: CreateCatDto): Promise<Pet> {
    return this.petsService.create(catToCreate);
  }
}
