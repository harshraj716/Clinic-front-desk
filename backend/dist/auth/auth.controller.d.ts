import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        user: import("../users/users.entity").User;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    getProfile(req: {
        user: any;
    }): any;
}
