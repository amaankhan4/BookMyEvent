import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserLoginDto,UserSignUpDto } from './dto/user-dto';
import * as bcrypt from 'bcrypt';
import { Request,Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService : DatabaseService, private readonly jwtService:JwtService){}
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

  async login(loginUserDto:UserLoginDto, res:Response){
    const {userMail,userPassword} = loginUserDto
    const user = await this.databaseService.user.findUnique({
      where:{
        userMail:userMail
      }
    })
    if(!user) throw new UnauthorizedException("Wrong Credentials");
    const passwordCheck = await bcrypt.compare(userPassword,user.userPassword)
    if(!passwordCheck) throw new UnauthorizedException("Wrong Credentials");
    const email:string = user.userMail;
    const userId:string = user.userId;
    const payload = {email:email,id:userId}
    res.cookie('user_token',this.jwtService.sign(payload),
    {
      httpOnly:true,
      expires:new Date(Date.now() + 7200000),
      secure:process.env.NODE_ENV === 'production',
      sameSite:'strict'
    })
    return {
      message: "Login successful",
      status: "success",
    };
  }
}
