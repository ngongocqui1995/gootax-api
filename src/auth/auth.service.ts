import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { I18nLang } from 'nestjs-i18n';
import { ENUM_MODEL } from 'src/common';
import { BaseService } from 'src/common/base.service';
import { CustomersService } from 'src/modules/customers/customers.service';
import { LoginCustomerDto } from 'src/modules/customers/dto/login-customer.dto';
import { DriversService } from 'src/modules/drivers/drivers.service';
import { LoginUserDto } from 'src/modules/users/dto/login-user.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { LoginRsp } from 'src/modules/users/interfaces/user';
import { PasswordHasherService } from './password-hasher/password-hasher.service';

@Injectable()
export class AuthService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) repo,
    private checkService: BaseService,
    private hasherService: PasswordHasherService,
    private jwtService: JwtService,
    @Inject(forwardRef(() => CustomersService))
    private customerService: CustomersService,
    @Inject(forwardRef(() => DriversService))
    private driverService: DriversService,
  ) {
    super(repo);
  }

  async login(dto: LoginUserDto, @I18nLang() lang: string): Promise<LoginRsp> {
    // verfiy user email
    const user = await this.findOne({
      where: { email: dto.email },
    });
    this.checkService.checkEmailNotExist(!!user);

    // check status
    this.checkService.checkStatus(user.status);

    // verify user password
    const matchedPassword = await this.hasherService.comparePassword(
      dto.password,
      user.password,
    );
    this.checkService.checkPasswordValid(matchedPassword);

    // generate JSON web token
    const token = await this.jwtService.signAsync(
      {
        email: user.email,
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        model: ENUM_MODEL.USER,
      },
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    return {
      token,
      message: await this.checkService.i18n.translate('messages.AUTH.GET', {
        lang,
      }),
    };
  }

  async customerLogin(
    dto: LoginCustomerDto,
    @I18nLang() lang: string,
  ): Promise<LoginRsp> {
    // verfiy customer phone
    const user = await this.customerService.findOne({
      where: { phone: dto.phone },
    });
    if (!user) {
      throw new HttpException(
        {
          message: 'Số điện thoại không tồn tại!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // check status
    this.checkService.checkStatus(user.status);

    // verify user password
    const matchedPassword = await this.hasherService.comparePassword(
      dto.password,
      user.password,
    );
    this.checkService.checkPasswordValid(matchedPassword);

    // generate JSON web token
    const token = await this.jwtService.signAsync(
      {
        phone: user.phone,
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        model: ENUM_MODEL.CUSTOMER,
      },
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    return {
      token,
      message: await this.checkService.i18n.translate('messages.AUTH.GET', {
        lang,
      }),
    };
  }

  async driverLogin(
    dto: LoginCustomerDto,
    @I18nLang() lang: string,
  ): Promise<LoginRsp> {
    // verfiy customer phone
    const user = await this.driverService.findOne({
      where: { phone: dto.phone },
    });
    if (!user) {
      throw new HttpException(
        {
          message: 'Số điện thoại không tồn tại!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // check status
    this.checkService.checkStatus(user.status);

    // verify user password
    const matchedPassword = await this.hasherService.comparePassword(
      dto.password,
      user.password,
    );
    this.checkService.checkPasswordValid(matchedPassword);

    // generate JSON web token
    const token = await this.jwtService.signAsync(
      {
        phone: user.phone,
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        model: ENUM_MODEL.DRIVER,
      },
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    return {
      token,
      message: await this.checkService.i18n.translate('messages.AUTH.GET', {
        lang,
      }),
    };
  }
}
