import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Roles } from './users/models';

@Injectable()
export class AppService {
  constructor(private jwtService: JwtService) {}

  async getJwt() {
    return this.jwtService.sign({sub: "someUserId", roles: [Roles.User, Roles.Moderator]});
  }

  async getRoles(roles: any) {
    console.log(roles);
  }
}
