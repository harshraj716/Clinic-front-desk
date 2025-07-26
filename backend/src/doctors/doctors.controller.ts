import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post('register')
  register(@Body() dto: CreateDoctorDto) {
    return this.doctorsService.register(dto);
  }

  @Post('login')
  login(@Body() dto: { email: string; password: string }) {
    return this.doctorsService.login(dto.email, dto.password);
  }

  @UseGuards(AuthGuard('doctor-jwt'))
  @Get('me')
  getProfile(@Request() req: { user: any }): any {
    return req.user;
  }
}
