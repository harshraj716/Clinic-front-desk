"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const appointments_controller_1 = require("./appointments.controller");
const appointments_service_1 = require("./appointments.service");
const appointments_entity_1 = require("./appointments.entity");
const patients_module_1 = require("../patients/patients.module");
const doctors_module_1 = require("../doctors/doctors.module");
let AppointmentsModule = class AppointmentsModule {
};
exports.AppointmentsModule = AppointmentsModule;
exports.AppointmentsModule = AppointmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([appointments_entity_1.Appointment]),
            patients_module_1.PatientsModule,
            doctors_module_1.DoctorsModule,
        ],
        controllers: [appointments_controller_1.AppointmentsController],
        providers: [appointments_service_1.AppointmentsService],
    })
], AppointmentsModule);
//# sourceMappingURL=appointments.module.js.map