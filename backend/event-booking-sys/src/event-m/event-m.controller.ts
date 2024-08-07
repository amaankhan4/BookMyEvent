import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventMService } from './event-m.service';
import { eventManagerLoginDto, eventManagerSignUpDto } from './dto/eventM-dto';
import { CreateEventDto } from 'src/events/dto/event-dto';

@Controller('event-m')
export class EventMController {
  constructor(private readonly EventMService:EventMService) {}

  @Get('login')
  async login(@Body() FetchEventMDto: eventManagerLoginDto) {
    return this.EventMService.login(FetchEventMDto)
  }
  @Post('signup')
  async signup(@Body() createEventMDto: eventManagerSignUpDto){
    return this.EventMService.signup(createEventMDto)
  }
  @Post('create')
  async createEvent(@Body() createEventDto:CreateEventDto){
    
  }
}
