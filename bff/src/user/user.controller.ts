
import { BadRequestException } from '@nestjs/common';
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() data: any) {
    const result =await this.userService.emitUserCreate(data);
    if(result.error){
        throw new BadRequestException(result.error);
    }
    return result.user;
  }
  @Post('login')
  async login(@Body() data: any) {
    let result= await this.userService.emitUserLogin(data);
    if(result.error){
        throw new BadRequestException(result.error);
    }
    return result.user;
  }
}

