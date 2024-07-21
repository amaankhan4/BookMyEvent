import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { eventManagerLoginDto,eventManagerSignUpDto } from './dto/eventM-dto';
import { eventManagerUpdateDto } from './dto/eventM-dto';

@Injectable()
export class EventMService {
  constructor(private readonly databaseService:DatabaseService){}
  
  async signup(createEventMDto: eventManagerSignUpDto) {
    return await this.databaseService.eventManager.create({
      data: createEventMDto
    });
  }

  async login(loginDto:eventManagerLoginDto){
    const user = await this.databaseService.eventManager.findUnique({
      where:{
        evmEmail:loginDto.evmEmail,
        evmPassword:loginDto.evmPassword
      }
    })
    if(!user){
      throw new UnauthorizedException("Wrong Login Credentials")
    }
    return "Login Successful"
  }

  async update(id: number, updateEventMDto: eventManagerUpdateDto) {
    return this.databaseService.eventManager.update({
      where:{
        evmid_ : id,
      },
      data:updateEventMDto
    })
  }

  async remove(id: number) {
    return this.databaseService.eventManager.delete({
      where:{
        evmid_:id
      }
    })
  }
}
