import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { Doctor } from './doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateDoctorDto): Promise<{ message: string }> {
    const exists = await this.doctorRepo.findOne({
      where: { email: dto.email },
    });
    if (exists) {
      throw new ConflictException('Doctor already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const doctor = this.doctorRepo.create({ ...dto, password: hashedPassword });
    await this.doctorRepo.save(doctor);

    return { message: 'Doctor registered successfully' };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const doctor = await this.doctorRepo.findOne({ where: { email } });
    if (!doctor) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, doctor.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: doctor.id, email: doctor.email, role: 'doctor' };
    const token = this.jwtService.sign(payload);

    return { accessToken: token };
  }

  async findById(id: number): Promise<Doctor | null> {
    return this.doctorRepo.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<Doctor | null> {
    return this.doctorRepo.findOne({ where: { email } });
  }
}
