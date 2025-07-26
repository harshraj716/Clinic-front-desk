import { FrontdeskService } from './frontdesk.service';
import { Frontdesk } from './frontdesk.entity';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
declare const FrontdeskJwtStrategy_base: new (...args: any) => any;
export declare class FrontdeskJwtStrategy extends FrontdeskJwtStrategy_base {
    private frontdeskService;
    constructor(frontdeskService: FrontdeskService);
    validate(payload: JwtPayload): Promise<Frontdesk>;
}
export {};
