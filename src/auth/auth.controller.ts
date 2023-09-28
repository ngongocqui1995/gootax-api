import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { I18nLang } from 'nestjs-i18n';
import { ENUM_MODEL } from 'src/common';
import { LoginCustomerDto } from 'src/modules/customers/dto/login-customer.dto';
import { LoginUserDto } from 'src/modules/users/dto/login-user.dto';
import { LoginRsp } from 'src/modules/users/interfaces/user';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  model_name: string = ENUM_MODEL.AUTH;

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() user: LoginUserDto,
    @I18nLang() lang: string,
  ): Promise<LoginRsp> {
    return await this.authService.login(user, lang);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{token}}',
  })
  async profile(@Request() req) {
    return req.user;
  }

  @Post('customer-login')
  async customterLogin(
    @Body() user: LoginCustomerDto,
    @I18nLang() lang: string,
  ): Promise<LoginRsp> {
    return await this.authService.customerLogin(user, lang);
  }

  @Get('customer-profile')
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{token}}',
  })
  async customerProfile(@Request() req) {
    return req.user;
  }
}
