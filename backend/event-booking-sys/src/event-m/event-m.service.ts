import { BadRequestException, HttpStatus, Injectable, Res, UnauthorizedException, UseGuards} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { eventManagerLoginDto,eventManagerSignUpDto } from './dto/eventM-dto';
import { CreateEventDto } from 'src/events/dto/event-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class EventMService {
  constructor(private readonly databaseService:DatabaseService, private readonly jwtService:JwtService){}
  
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

  async login(loginDto:eventManagerLoginDto, res:Response) {
    const user = await this.databaseService.eventManager.findUnique({
      where:{
        evmEmail:loginDto.evmEmail,
      }
    })
    if(!user) throw new UnauthorizedException("Wrong Credentials");
    const passwordCheck = await bcrypt.compare(loginDto.evmPassword,user.evmPassword)
    if(!passwordCheck) throw new UnauthorizedException("Wrong Credentials");
    const email:string = user.evmEmail;
    const userId:string = user.evmUserId;
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

  async createEvent(createEventDto:CreateEventDto, request){
    const token = request.cookies['user_token'];
    const user = await this.jwtService.verify(token);
    const managerid:string = user.id;
    const {eventId,title,description,date} = createEventDto;
    await this.databaseService.events.create({
      data:{
        eventId,
        title,
        description,
        date,
        evMangerid_:managerid
    }
  })
  }
}
