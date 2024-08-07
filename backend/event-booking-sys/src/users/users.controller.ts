import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { UserLoginDto,UserSignUpDto } from './dto/user-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  login(@Body() loginUserDto: UserLoginDto) {
    return this.usersService.login(loginUserDto);
  }

  @Post('signup')
  sugnup(@Body() createuserdto : UserSignUpDto){
    return this.usersService.signup(createuserdto)
  }
}
