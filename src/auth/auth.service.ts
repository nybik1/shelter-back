import { HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { getUserObject } from "src/helpers/getUserObject";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/schemas/user.schema";
import { throwErrorStatus } from "src/helpers/throwErrorStatus";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<{ access_token: string; user: Partial<User> }> {
    try {
      const user = await this.usersService.getUserByEmail(email);

      if (!user) {
        return throwErrorStatus("User not found", HttpStatus.NOT_FOUND);
      }

      const isPasswordMatching = await bcrypt.compare(password, user.password);
      if (!isPasswordMatching) {
        return throwErrorStatus("User not found", HttpStatus.NOT_FOUND);
      }

      const access_token = this.jwtService.sign(
        {
          id: user.email,
          sub: user._id.toString(),
        },
        {
          secret: process.env.JWT_SECRET,
        },
      );
      const userObject = getUserObject(user);
      return {
        access_token,
        user: userObject,
      };
    } catch (error) {
      console.log(error);
      const invalidPasswordOrNotFound = error.status === 404;
      throwErrorStatus(
        error?.message,
        invalidPasswordOrNotFound ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
