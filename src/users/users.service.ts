import { Injectable } from '@nestjs/common';

import { Roles } from './models';

@Injectable()
export class UsersService {
    async getRoles(): Promise<Roles[]> {
        return [Roles.Admin, Roles.User];
    }
}
