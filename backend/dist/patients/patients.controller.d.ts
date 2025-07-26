import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
export declare class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    create(dto: CreatePatientDto): Promise<import("./patient.entity").Patient>;
    findAll(): Promise<import("./patient.entity").Patient[]>;
    findOne(id: number): Promise<import("./patient.entity").Patient>;
    update(id: number, dto: UpdatePatientDto): Promise<import("./patient.entity").Patient>;
    remove(id: number): Promise<void>;
}
