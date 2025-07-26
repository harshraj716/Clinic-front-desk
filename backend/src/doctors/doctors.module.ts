import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Doctor } from './doctor.entity';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { DoctorJwtStrategy } from './doctor-jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { env } from 'process'; // Importing process.env for environment variables

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'jwt_secret_key',
      signOptions: { expiresIn: env.JWT_EXPIRATION_TIME || '1h' }, // Use environment variable for expiration time
    }),
    PassportModule.register({ defaultStrategy: 'doctor-jwt' }),
  ],
  providers: [DoctorsService, DoctorJwtStrategy],
  controllers: [DoctorsController],
})
export class DoctorsModule {}
