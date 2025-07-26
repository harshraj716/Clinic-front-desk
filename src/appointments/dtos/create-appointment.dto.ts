import { IsDateString, IsEnum, IsInt } from 'class-validator';
import { AppointmentStatus } from '../enums/appointment-status.enum';

export class CreateAppointmentDto {
  @IsInt()
  patientId: number;

  @IsInt()
  doctorId: number;

  @IsDateString()
  scheduledAt: Date;

  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;
}
