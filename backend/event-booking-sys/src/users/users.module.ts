import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { jwtStrategy } from 'src/auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[DatabaseModule,JwtModule.register({secret:process.env.SECRET_KEY,signOptions:{expiresIn:'2h'}})],
  controllers: [UsersController],
  providers: [UsersService, jwtStrategy],
})
export class UsersModule {}
