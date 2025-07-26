import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Frontdesk } from './frontdesk.entity';
import { RegisterFrontdeskDto } from './dtos/register.dto';
import { LoginFrontdeskDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class FrontdeskService {
  constructor(
    @InjectRepository(Frontdesk)
    private frontdeskRepo: Repository<Frontdesk>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterFrontdeskDto): Promise<Frontdesk> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const staff = this.frontdeskRepo.create({
      ...dto,
      password: hashedPassword,
    });
    return this.frontdeskRepo.save(staff);
  }

  async login(dto: LoginFrontdeskDto): Promise<{ accessToken: string }> {
    const staff = await this.frontdeskRepo.findOneBy({ email: dto.email });
    if (!staff) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(dto.password, staff.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: staff.id, email: staff.email, role: 'frontdesk' };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async findByEmail(email: string): Promise<Frontdesk | null> {
    return this.frontdeskRepo.findOneBy({ email });
  }

  async findById(id: number): Promise<Frontdesk | null> {
    return this.frontdeskRepo.findOneBy({ id });
  }
}
