import { Module } from '@nestjs/common';
import { EventMService } from './event-m.service';
import { EventMController } from './event-m.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [EventMController],
  providers: [EventMService],
})
export class EventMModule {}
