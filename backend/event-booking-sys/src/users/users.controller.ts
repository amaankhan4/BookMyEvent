import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
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
  sugnup(@Body() createuserdto : UserSignUpDto){
    return this.usersService.signup(createuserdto)
  }
}
