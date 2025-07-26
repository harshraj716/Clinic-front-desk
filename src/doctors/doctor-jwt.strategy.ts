import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DoctorsService } from './doctors.service';
import { Doctor } from './doctor.entity';

@Injectable()
export class DoctorJwtStrategy extends PassportStrategy(
  Strategy,
  'doctor-jwt',
) {
  constructor(private readonly doctorsService: DoctorsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'jwt_secret_key',
    });
  }

  async validate(payload: { email: string }): Promise<Doctor> {
    const doctor = await this.doctorsService.findByEmail(payload.email);
    if (!doctor) {
      throw new UnauthorizedException('Doctor not found');
    }
    return doctor;
  }
}
