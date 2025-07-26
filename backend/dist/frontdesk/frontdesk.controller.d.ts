import { FrontdeskService } from './frontdesk.service';
import { RegisterFrontdeskDto } from './dtos/register.dto';
import { LoginFrontdeskDto } from './dtos/login.dto';
export declare class FrontdeskController {
    private frontdeskService;
    constructor(frontdeskService: FrontdeskService);
    register(dto: RegisterFrontdeskDto): Promise<import("./frontdesk.entity").Frontdesk>;
    login(dto: LoginFrontdeskDto): Promise<{
        accessToken: string;
    }>;
}
