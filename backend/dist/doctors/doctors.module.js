"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const doctor_entity_1 = require("./doctor.entity");
const doctors_service_1 = require("./doctors.service");
const doctors_controller_1 = require("./doctors.controller");
const doctor_jwt_strategy_1 = require("./doctor-jwt.strategy");
const passport_1 = require("@nestjs/passport");
const process_1 = require("process");
let DoctorsModule = class DoctorsModule {
};
exports.DoctorsModule = DoctorsModule;
exports.DoctorsModule = DoctorsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([doctor_entity_1.Doctor]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'jwt_secret_key',
                signOptions: { expiresIn: process_1.env.JWT_EXPIRATION_TIME || '1h' },
            }),
            passport_1.PassportModule.register({ defaultStrategy: 'doctor-jwt' }),
        ],
        providers: [doctors_service_1.DoctorsService, doctor_jwt_strategy_1.DoctorJwtStrategy],
        controllers: [doctors_controller_1.DoctorsController],
    })
], DoctorsModule);
//# sourceMappingURL=doctors.module.js.map