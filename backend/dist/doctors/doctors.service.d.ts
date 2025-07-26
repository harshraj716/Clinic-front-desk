import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Doctor } from './doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
export declare class DoctorsService {
    private readonly doctorRepo;
    private readonly jwtService;
    constructor(doctorRepo: Repository<Doctor>, jwtService: JwtService);
    register(dto: CreateDoctorDto): Promise<{
        message: string;
    }>;
    login(email: string, password: string): Promise<{
        accessToken: string;
    }>;
    findById(id: number): Promise<Doctor | null>;
    findByEmail(email: string): Promise<Doctor | null>;
}
