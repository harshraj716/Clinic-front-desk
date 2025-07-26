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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorJwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const doctors_service_1 = require("./doctors.service");
let DoctorJwtStrategy = class DoctorJwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'doctor-jwt') {
    doctorsService;
    constructor(doctorsService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || 'jwt_secret_key',
        });
        this.doctorsService = doctorsService;
    }
    async validate(payload) {
        const doctor = await this.doctorsService.findByEmail(payload.email);
        if (!doctor) {
            throw new common_1.UnauthorizedException('Doctor not found');
        }
        return doctor;
    }
};
exports.DoctorJwtStrategy = DoctorJwtStrategy;
exports.DoctorJwtStrategy = DoctorJwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [doctors_service_1.DoctorsService])
], DoctorJwtStrategy);
//# sourceMappingURL=doctor-jwt.strategy.js.map