"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const doctor_entity_1 = require("./doctor.entity");
let DoctorsService = class DoctorsService {
    doctorRepo;
    jwtService;
    constructor(doctorRepo, jwtService) {
        this.doctorRepo = doctorRepo;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const exists = await this.doctorRepo.findOne({
            where: { email: dto.email },
        });
        if (exists) {
            throw new common_1.ConflictException('Doctor already exists');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const doctor = this.doctorRepo.create({ ...dto, password: hashedPassword });
        await this.doctorRepo.save(doctor);
        return { message: 'Doctor registered successfully' };
    }
    async login(email, password) {
        const doctor = await this.doctorRepo.findOne({ where: { email } });
        if (!doctor)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const match = await bcrypt.compare(password, doctor.password);
        if (!match)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const payload = { sub: doctor.id, email: doctor.email, role: 'doctor' };
        const token = this.jwtService.sign(payload);
        return { accessToken: token };
    }
    async findById(id) {
        return this.doctorRepo.findOne({ where: { id } });
    }
    async findByEmail(email) {
        return this.doctorRepo.findOne({ where: { email } });
    }
};
exports.DoctorsService = DoctorsService;
exports.DoctorsService = DoctorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(doctor_entity_1.Doctor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], DoctorsService);
//# sourceMappingURL=doctors.service.js.map