import { Controller, Get, Post, Body, Res, Req, UseGuards } from '@nestjs/common';
import { EventMService } from './event-m.service';
import { eventManagerLoginDto, eventManagerSignUpDto } from './dto/eventM-dto';
import { CreateEventDto } from 'src/events/dto/event-dto';
import { Response,Request } from 'express';
import { JwtGuard } from 'src/auth/guard';

@Controller('event-m')
export class EventMController {
  constructor(private readonly EventMService:EventMService) {}

  @Get('login')
  async login(@Body() FetchEventMDto: eventManagerLoginDto, @Res({passthrough:true}) response:Response) {
    return this.EventMService.login(FetchEventMDto,response)
  }
  @Post('signup')
  async signup(@Body() createEventMDto: eventManagerSignUpDto){
    return this.EventMService.signup(createEventMDto)
  }
  @UseGuards(JwtGuard)
  @Get('create')
  async createEvent(@Body() createEventDto:CreateEventDto, @Req() request:Request){
    return this.EventMService.createEvent(createEventDto, request)
  }
}
