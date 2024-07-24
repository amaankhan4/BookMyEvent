import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { UserLoginDto,UserSignUpDto,UserUpdateDto } from './dto/user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService : DatabaseService){}
  async signup(createUserDto: UserSignUpDto) {
    const check = await this.databaseService.user.findUnique({
      where:{
        userMail:createUserDto.userMail
      }
    })
    
    if(check != null) throw new BadRequestException("User Already Exists")
    const userPassword = await bcrypt.hash(createUserDto.userPassword,10)
    const newcreateUserDto = {...createUserDto, userPassword:userPassword}
    return this.databaseService.user.create({
      data:newcreateUserDto
    })
  }

  async login(loginUserDto:UserLoginDto){
    const {userMail,userPassword} = loginUserDto
    const user = await this.databaseService.user.findUnique({
      where:{
        userMail:userMail
      }
    })
    if(!user) throw new UnauthorizedException("Wrong Credentials");
    const passwordCheck = await bcrypt.compare(userPassword,user.userPassword)
    if(!passwordCheck) throw new UnauthorizedException("Wrong Credentials");
    return "Login Successful"
  }


  async update(id: number, updateUserDto: Prisma.userUpdateInput) {
    return this.databaseService.user.update({
      where:{
        userid_ :id,
      },
      data:updateUserDto
    })
  }

  async remove(id: number) {
    return this.databaseService.user.delete({
      where:{
        userid_:id
      }
    })
  }
}
