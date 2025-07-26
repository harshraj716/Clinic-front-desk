import { Body, Controller, Post } from '@nestjs/common';
import { FrontdeskService } from './frontdesk.service';
import { RegisterFrontdeskDto } from './dtos/register.dto';
import { LoginFrontdeskDto } from './dtos/login.dto';

@Controller('api/frontdesk')
export class FrontdeskController {
  constructor(private frontdeskService: FrontdeskService) {}

  @Post('register')
  register(@Body() dto: RegisterFrontdeskDto) {
    return this.frontdeskService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginFrontdeskDto) {
    return this.frontdeskService.login(dto);
  }
}
