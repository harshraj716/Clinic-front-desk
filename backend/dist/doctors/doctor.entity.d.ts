import { Appointment } from '../appointments/appointments.entity';
export declare class Doctor {
    id: number;
    name: string;
    specialization: string;
    email: string;
    password: string;
    phone: string;
    appointments: Appointment[];
}
