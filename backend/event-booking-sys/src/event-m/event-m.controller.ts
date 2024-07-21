import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventMService } from './event-m.service';
import { eventManagerLoginDto, eventManagerSignUpDto } from './dto/eventM-dto';
import { eventManagerUpdateDto } from './dto/eventM-dto';

@Controller('event-m')
export class EventMController {
  constructor(private readonly EventMService:EventMService) {}

  @Post('login')
  async login(@Body() FetchEventMDto: eventManagerLoginDto) {
    return this.EventMService.login(FetchEventMDto)
  }
  @Post('SignUp')
  async signup(@Body() createEventMDto: eventManagerSignUpDto){
    return this.EventMService.signup(createEventMDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.EventMService.remove(+id)
  }
}
