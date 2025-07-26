import { IsOptional, IsEnum, IsDateString, IsInt } from 'class-validator';
import { AppointmentStatus } from '../enums/appointment-status.enum';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsInt()
  patientId?: number;

  @IsOptional()
  @IsInt()
  doctorId?: number;

  @IsOptional()
  @IsDateString()
  scheduledAt?: Date;

  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;
}
