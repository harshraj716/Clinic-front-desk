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
exports.FrontdeskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const frontdesk_entity_1 = require("./frontdesk.entity");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let FrontdeskService = class FrontdeskService {
    frontdeskRepo;
    jwtService;
    constructor(frontdeskRepo, jwtService) {
        this.frontdeskRepo = frontdeskRepo;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const staff = this.frontdeskRepo.create({
            ...dto,
            password: hashedPassword,
        });
        return this.frontdeskRepo.save(staff);
    }
    async login(dto) {
        const staff = await this.frontdeskRepo.findOneBy({ email: dto.email });
        if (!staff)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const match = await bcrypt.compare(dto.password, staff.password);
        if (!match)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const payload = { sub: staff.id, email: staff.email, role: 'frontdesk' };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
    async findByEmail(email) {
        return this.frontdeskRepo.findOneBy({ email });
    }
    async findById(id) {
        return this.frontdeskRepo.findOneBy({ id });
    }
};
exports.FrontdeskService = FrontdeskService;
exports.FrontdeskService = FrontdeskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(frontdesk_entity_1.Frontdesk)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], FrontdeskService);
//# sourceMappingURL=frontdesk.service.js.map