import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./user.schema";

export type PetDocument = HydratedDocument<Pet>;

@Schema()
export class Pet {
  @Prop() breed: string;

  @Prop() age: number;

  @Prop() gender: string;

  @Prop() weight: number;

  @Prop() description: string;

  @Prop() images: string[];

  @Prop() availableForAdoption: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" }) owner: User;
}

export const CatSchema = SchemaFactory.createForClass(Pet);
