import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepo.findOne({ where: { id } });
  }

  async createUser(
    username: string,
    email: string,
    hashedPassword: string,
  ): Promise<User> {
    const user = this.userRepo.create({
      username,
      email,
      password: hashedPassword,
    });
    return this.userRepo.save(user);
  }
}
