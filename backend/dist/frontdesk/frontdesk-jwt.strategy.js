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
exports.FrontdeskJwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const frontdesk_service_1 = require("./frontdesk.service");
let FrontdeskJwtStrategy = class FrontdeskJwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'frontdesk-jwt') {
    frontdeskService;
    constructor(frontdeskService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || 'jwt_secret_key',
        });
        this.frontdeskService = frontdeskService;
    }
    async validate(payload) {
        const user = await this.frontdeskService.findByEmail(payload.email);
        if (!user)
            throw new common_1.UnauthorizedException('Frontdesk staff not found');
        return user;
    }
};
exports.FrontdeskJwtStrategy = FrontdeskJwtStrategy;
exports.FrontdeskJwtStrategy = FrontdeskJwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [frontdesk_service_1.FrontdeskService])
], FrontdeskJwtStrategy);
//# sourceMappingURL=frontdesk-jwt.strategy.js.map