import { DoctorsService } from './doctors.service';
import { Doctor } from './doctor.entity';
declare const DoctorJwtStrategy_base: new (...args: any) => any;
export declare class DoctorJwtStrategy extends DoctorJwtStrategy_base {
    private readonly doctorsService;
    constructor(doctorsService: DoctorsService);
    validate(payload: {
        email: string;
    }): Promise<Doctor>;
}
export {};
