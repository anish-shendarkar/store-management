import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.userService.getUser(email);

    console.log('localstrategyvalidate', user);

    if (user === undefined || user == null) throw new UnauthorizedException();
    const isMatch = await bcrypt.compare(password, user.password);
    if (user != undefined && isMatch) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
