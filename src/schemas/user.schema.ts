import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { UserRole, VolonteerType } from "src/types/common";

export type UserDocument = HydratedDocument<User>;

@Schema({})
export class User {
  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  firstname: string;

  @Prop({
    required: true,
  })
  lastname: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({ required: true, type: String, enum: UserRole })
  role: string;

  //   @Prop({
  //     required: function () {
  //       return this.role === 'volonteer';
  //     },
  //     type: String,
  //     enum: VolonteerType,
  //   })
  //   type: string;
  phone: string[];

  @Prop()
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
