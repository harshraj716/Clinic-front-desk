import { Appointment } from './appointments.entity';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { UpdateAppointmentDto } from './dtos/update-appointment.dto';
export declare class AppointmentsService {
    private readonly appointmentRepo;
    constructor(appointmentRepo: Repository<Appointment>);
    create(dto: CreateAppointmentDto): Promise<Appointment>;
    findAll(): Promise<Appointment[]>;
    findOne(id: number): Promise<Appointment>;
    update(id: number, dto: UpdateAppointmentDto): Promise<Appointment>;
    delete(id: number): Promise<void>;
}
