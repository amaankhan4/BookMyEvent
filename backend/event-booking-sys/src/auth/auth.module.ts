import { Module } from '@nestjs/common';
import { jwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
    providers: [jwtStrategy],
    imports: [
        PassportModule.register(
            { defaultStrategy: 'jwt',session: false }
        ),
        JwtModule.register(
            {secret: process.env.SECRET_KEY, signOptions: { expiresIn: '1h' }}
        ),
    ],
})
export class AuthModule {}
