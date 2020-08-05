import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { RolesGuard } from './guards/roles.guard';

import { Roles } from './users/models';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('jwt')
  async getJwt() {
    return await this.appService.getJwt();
  }

  @UseGuards(RolesGuard([Roles.Admin, Roles.Moderator]))
  @Get('roles')
  async getRoles(@Request() req: any) {
    return await this.appService.getRoles(req.user);
  }
}
