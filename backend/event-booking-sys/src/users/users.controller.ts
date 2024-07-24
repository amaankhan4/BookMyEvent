import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { UserLoginDto,UserSignUpDto,UserUpdateDto } from './dto/user-dto';

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


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Prisma.userUpdateInput) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
