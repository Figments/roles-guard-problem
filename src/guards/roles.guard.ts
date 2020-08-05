import { CanActivate, ExecutionContext, mixin, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import { Roles } from 'src/users/models';

/**
 * This is a mixin so we can do stuff like UseGuards(RolesGuard(['Admin','Moderator'])).
 * 
 * @param roles The roles required to activate the associated route
 */
export const RolesGuard = (requiredRoles: Roles[]) => {
  class RolesGuardMixin implements CanActivate {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext) {
      // Getting the request.
      const request = context.switchToHttp().getRequest();

      // Getting the JSON Web Token from the authorization header.
      const jwtToken: string = request.headers['authorization'];

      // Checking to see if the token matches the correct format.
      // If it does, then grab the token. If not, throw an 
      // Unauthorized exception.
      let bearerToken: string;
      if (jwtToken.startsWith('Bearer ')) {
        bearerToken = jwtToken.substring(7, jwtToken.length);
      } else {
        throw new UnauthorizedException(`You don't have permission to do that.`);
      }

      console.log(bearerToken);
      console.log(this.usersService); // undefined
      console.log(this.jwtService); // undefined

      request.user = this.jwtService.verify(bearerToken);

      return true;
    }
  }

  const guard = mixin(RolesGuardMixin);
  return guard;
}
