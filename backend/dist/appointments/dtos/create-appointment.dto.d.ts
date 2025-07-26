import { AppointmentStatus } from '../enums/appointment-status.enum';
export declare class CreateAppointmentDto {
    patientId: number;
    doctorId: number;
    scheduledAt: Date;
    status: AppointmentStatus;
}
