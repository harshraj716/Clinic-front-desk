import { Repository } from 'typeorm';
import { Frontdesk } from './frontdesk.entity';
import { RegisterFrontdeskDto } from './dtos/register.dto';
import { LoginFrontdeskDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class FrontdeskService {
    private frontdeskRepo;
    private jwtService;
    constructor(frontdeskRepo: Repository<Frontdesk>, jwtService: JwtService);
    register(dto: RegisterFrontdeskDto): Promise<Frontdesk>;
    login(dto: LoginFrontdeskDto): Promise<{
        accessToken: string;
    }>;
    findByEmail(email: string): Promise<Frontdesk | null>;
    findById(id: number): Promise<Frontdesk | null>;
}
