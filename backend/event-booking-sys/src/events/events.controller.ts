import { EventsService } from './events.service';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  @Post('create')
  async createEvent(){
    
  }
}
