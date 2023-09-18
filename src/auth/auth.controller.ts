import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from 'src/modules/users/dto/login-user.dto';
import { I18nLang } from 'nestjs-i18n';
import { LoginRsp } from 'src/modules/users/interfaces/user';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ENUM_MODEL } from 'src/common';

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
}
