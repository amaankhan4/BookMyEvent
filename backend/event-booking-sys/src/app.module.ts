import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EventMModule } from './event-m/event-m.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UsersModule, EventMModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
