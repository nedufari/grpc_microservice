import { Controller, Get } from '@nestjs/common';
import { AdminauthService } from './adminauth.service';

@Controller()
export class AdminauthController {
  constructor(private readonly adminauthService: AdminauthService) {}

  @Get()
  getHello(): string {
    return this.adminauthService.getHello();
  }
}
