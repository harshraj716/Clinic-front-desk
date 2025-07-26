import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Frontdesk } from './frontdesk.entity';
import { FrontdeskService } from './frontdesk.service';
import { FrontdeskController } from './frontdesk.controller';
import { JwtModule } from '@nestjs/jwt';
import { FrontdeskJwtStrategy } from './frontdesk-jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Frontdesk]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'jwt_secret_key',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [FrontdeskService, FrontdeskJwtStrategy],
  controllers: [FrontdeskController],
  exports: [FrontdeskService],
})
export class FrontdeskModule {}
