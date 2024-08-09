import { Module } from '@nestjs/common';
import { EventMService } from './event-m.service';
import { EventMController } from './event-m.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports:[DatabaseModule,JwtModule.register({secret:process.env.SECRET_KEY,signOptions:{expiresIn:'2h'}})],
  controllers: [EventMController],
  providers: [EventMService,jwtStrategy],
})
export class EventMModule {}
