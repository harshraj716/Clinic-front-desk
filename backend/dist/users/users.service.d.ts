import { Repository } from 'typeorm';
import { User } from './users.entity';
export declare class UsersService {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    createUser(username: string, email: string, hashedPassword: string): Promise<User>;
}
