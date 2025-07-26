"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontdeskModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const frontdesk_entity_1 = require("./frontdesk.entity");
const frontdesk_service_1 = require("./frontdesk.service");
const frontdesk_controller_1 = require("./frontdesk.controller");
const jwt_1 = require("@nestjs/jwt");
const frontdesk_jwt_strategy_1 = require("./frontdesk-jwt.strategy");
let FrontdeskModule = class FrontdeskModule {
};
exports.FrontdeskModule = FrontdeskModule;
exports.FrontdeskModule = FrontdeskModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([frontdesk_entity_1.Frontdesk]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'jwt_secret_key',
                signOptions: { expiresIn: '7d' },
            }),
        ],
        providers: [frontdesk_service_1.FrontdeskService, frontdesk_jwt_strategy_1.FrontdeskJwtStrategy],
        controllers: [frontdesk_controller_1.FrontdeskController],
        exports: [frontdesk_service_1.FrontdeskService],
    })
], FrontdeskModule);
//# sourceMappingURL=frontdesk.module.js.map