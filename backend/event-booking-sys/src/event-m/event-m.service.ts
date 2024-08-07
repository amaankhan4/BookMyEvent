import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { eventManagerLoginDto,eventManagerSignUpDto } from './dto/eventM-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EventMService {
  constructor(private readonly databaseService:DatabaseService){}
  
  async signup(createEventMDto: eventManagerSignUpDto) {
    const user = await this.databaseService.eventManager.findUnique({
      where:{
        evmEmail:createEventMDto.evmEmail
      }
    })
    if(user != null) throw new BadRequestException("User Already Exists");
    const userPassword = await bcrypt.hash(createEventMDto.evmPassword,10)
    const newcreateUserDto = {...createEventMDto, evmPassword:userPassword}
    await this.databaseService.eventManager.create({
      data:newcreateUserDto
    })
    return ({
      message:"User Created",
      status:HttpStatus.CREATED,
    });
  }

  async login(loginDto:eventManagerLoginDto){
    const user = await this.databaseService.eventManager.findUnique({
      where:{
        evmEmail:loginDto.evmEmail,
      }
    })
    if(!user) throw new UnauthorizedException("Wrong Credentials");
    const passwordCheck = await bcrypt.compare(loginDto.evmPassword,user.evmPassword)
    if(!passwordCheck) throw new UnauthorizedException("Wrong Credentials");
    return {
      message: "Login Successful",
      status: HttpStatus.OK,
    };
  }
}
