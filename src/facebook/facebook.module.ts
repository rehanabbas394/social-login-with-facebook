import { Module } from '@nestjs/common';
import { FacebookController } from './facebook.controller';
import { FacebookService } from './facebook.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { FacebookStrategy } from './facebook.strategy';
import { UsersModule } from 'src/user/user.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_TOKEN_EXPIRY_TIME },
    }),
    UsersModule,
  ],
  controllers: [FacebookController],
  providers: [FacebookService, FacebookStrategy],
})
export class FacebookModule {}
