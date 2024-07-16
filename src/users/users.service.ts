import { HttpStatus, Injectable } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/schemas/user.schema";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { throwErrorStatus } from "src/helpers/throwErrorStatus";
import { getUserObject } from "src/helpers/getUserObject";

@Injectable()
export class UsersService {
  private readonly saltsRounds = 10;
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async getUserById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throwErrorStatus("User not found", HttpStatus.NOT_FOUND);
    const userObject = getUserObject(user);
    return userObject;
  }
  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throwErrorStatus("User not found", HttpStatus.NOT_FOUND);
    return user;
  }
  async signUp(user: UserDto) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, this.saltsRounds);
      const newUser = new this.userModel({ ...user, password: hashedPassword });
      await newUser.save();
    } catch (error) {
      console.log(error);
      const isDuplicate = error?.code === 11000;
      const codeStatus = isDuplicate ? HttpStatus.CONFLICT : HttpStatus.INTERNAL_SERVER_ERROR;
      const message = isDuplicate ? "User already exists" : error?.message;
      throwErrorStatus(message, codeStatus);
    }
  }
}
