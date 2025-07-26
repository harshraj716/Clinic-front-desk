import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
export declare class PatientsService {
    private readonly patientRepo;
    constructor(patientRepo: Repository<Patient>);
    create(dto: CreatePatientDto): Promise<Patient>;
    findAll(): Promise<Patient[]>;
    findOne(id: number): Promise<Patient>;
    update(id: number, dto: UpdatePatientDto): Promise<Patient>;
    remove(id: number): Promise<void>;
}
