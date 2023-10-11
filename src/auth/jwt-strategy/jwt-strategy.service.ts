import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ENUM_MODEL, ENUM_STATUS } from 'src/common';
import { CustomersService } from 'src/modules/customers/customers.service';
import { DriversService } from 'src/modules/drivers/drivers.service';
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(
    private userService: UsersService,
    @Inject(forwardRef(() => CustomersService))
    private customerService: CustomersService,
    @Inject(forwardRef(() => DriversService))
    private driverService: DriversService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    let result;
    switch (payload.model) {
      case ENUM_MODEL.USER: {
        result = await this.userService.findOne({
          where: { id: payload.id },
          relations: [
            'role',
            'role.menus',
            'role.menus.menu',
            'role.menus.permissions',
          ],
        });
        break;
      }
      case ENUM_MODEL.CUSTOMER: {
        result = await this.customerService.findOne({
          where: { id: payload.id },
        });
        break;
      }
      case ENUM_MODEL.DRIVER: {
        result = await this.driverService.findOne({
          where: { id: payload.id },
        });
        break;
      }
    }

    if (!result) throw new UnauthorizedException('UnAuthorized');

    if (result.status != ENUM_STATUS.ACTIVE)
      throw new UnauthorizedException('Tài khoản chưa kích hoạt!');

    delete result.password;
    return result;
  }
}
