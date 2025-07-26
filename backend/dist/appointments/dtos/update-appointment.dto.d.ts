import { AppointmentStatus } from '../enums/appointment-status.enum';
export declare class UpdateAppointmentDto {
    patientId?: number;
    doctorId?: number;
    scheduledAt?: Date;
    status?: AppointmentStatus;
}
