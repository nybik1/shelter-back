import { Controller, Post, Body, Get, Request, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDto } from "./dto/user.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/signup")
  async signUp(@Body() userDto: UserDto) {
    return this.usersService.signUp(userDto);
  }

  @UseGuards(AuthGuard)
  @Get("/profile")
  async getProfile(@Request() req) {
    return this.usersService.getUserById(req.user.sub);
  }
}
