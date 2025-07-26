// src/patients/patients.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
  ) {}

  async create(dto: CreatePatientDto): Promise<Patient> {
    const patient = this.patientRepo.create(dto);
    return this.patientRepo.save(patient);
  }

  async findAll(): Promise<Patient[]> {
    return this.patientRepo.find();
  }

  async findOne(id: number): Promise<Patient> {
    const patient = await this.patientRepo.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    return patient;
  }

  async update(id: number, dto: UpdatePatientDto): Promise<Patient> {
    await this.findOne(id); // Ensure patient exists
    await this.patientRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // Ensure patient exists
    await this.patientRepo.delete(id);
  }
}
