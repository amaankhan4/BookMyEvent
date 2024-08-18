import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { UserLoginDto,UserSignUpDto } from './dto/user-dto';
import {Response,Request} from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  login(@Body() loginUserDto: UserLoginDto, @Res({passthrough:true}) response:Response) {
    return this.usersService.login(loginUserDto,response);
  }

  @Post('signup')
  signup(@Body() createuserdto : UserSignUpDto){
    return this.usersService.signup(createuserdto)
  }
  @Get('upcoming-events')
  upcomingEvents(){
    return this.usersService.upcomingEvents();
  }
  @Post('register-event/:eventId')
  registerEvent(@Param('eventId') eventId:string,@Res({passthrough:true}) response:Response,@Req() request:Request){
    return this.usersService.registerEvent(eventId,response,request)
  }
}
