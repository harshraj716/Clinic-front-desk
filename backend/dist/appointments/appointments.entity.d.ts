import { Patient } from '../patients/patient.entity';
import { Doctor } from '../doctors/doctor.entity';
export declare enum AppointmentStatus {
    BOOKED = "booked",
    COMPLETED = "completed",
    CANCELED = "canceled"
}
export declare class Appointment {
    id: number;
    patient: Patient;
    doctor: Doctor;
    scheduledAt: Date;
    status: AppointmentStatus;
    createdAt: Date;
    updatedAt: Date;
}
