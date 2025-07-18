
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signup(@Body() data: any) {
    return this.userService.emitUserCreate(data);
  }
  @Post('login')
  login(@Body() data: any) {
    return this.userService.emitUserLogin(data);
  }
}

