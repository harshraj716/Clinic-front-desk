import { Appointment } from '../appointments/appointments.entity';
export declare class Patient {
    id: number;
    name: string;
    phone: string;
    age: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    appointments: Appointment[];
}
