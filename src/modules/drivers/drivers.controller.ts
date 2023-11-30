import {
  Body,
  Controller,
  Param,
  Put,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiHeader, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { I18nLang } from 'nestjs-i18n';
import { RequireRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { ENUM_MODEL } from 'src/common';
import { BaseController } from 'src/common/base.controller';
import { UpdateStatusDTO } from 'src/common/dto/update-status.dto';
import { ROLES } from '../roles/contants/contants';
import { ChangePasswordEmailDTO } from '../users/dto/change-password-email.dto';
import { ChangePasswordDTO } from '../users/dto/change-password.dto';
import { DriversService } from './drivers.service';
import { ChangeLocationDTO } from './dto/change-location.dto';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';

@Crud({
  model: {
    type: Driver,
  },
  dto: {
    create: CreateDriverDto,
    update: UpdateDriverDto,
  },
  query: {
    join: {
      car: {
        allow: undefined,
      },
      'car.company': {
        allow: undefined,
      },
      'car.car_style': {
        allow: undefined,
      },
      'car.vehicle': {
        allow: undefined,
      },
      'car.type_car': {
        allow: undefined,
      },
    },
    exclude: ['id'],
  },
  routes: {
    exclude: ['deleteOneBase', 'createManyBase'],
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
})
@ApiTags('Drivers')
@Controller('drivers')
export class DriversController implements CrudController<Driver> {
  model_name: string = ENUM_MODEL.DRIVER;

  constructor(
    public service: DriversService,
    private checkController: BaseController,
  ) {}

  get base(): CrudController<Driver> {
    return this;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequireRoles(ROLES.ROLE_ADMIN)
  @Override()
  getMany(@ParsedRequest() req) {
    return this.service.getManyBase(req);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequireRoles(ROLES.ROLE_ADMIN)
  @Override('getOneBase')
  getOneAndDoStuff(@ParsedRequest() req: CrudRequest) {
    return this.base.getOneBase(req);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequireRoles(ROLES.ROLE_ADMIN)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{token}}',
  })
  @Override('updateOneBase')
  coolFunction(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateDriverDto,
    @I18nLang() lang: string,
  ) {
    return this.service.updateOneBase(id, req, dto, lang);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequireRoles(ROLES.ROLE_ADMIN)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{token}}',
  })
  @Override('replaceOneBase')
  awesomePUT(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateDriverDto,
    @I18nLang() lang: string,
  ) {
    return this.service.replaceOneBase(id, req, dto, lang);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{token}}',
  })
  @Override()
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateDriverDto,
    @I18nLang() lang: string,
  ) {
    return this.service.createOneBase(req, dto, lang);
  }

  @Put('status/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequireRoles(ROLES.ROLE_ADMIN)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{token}}',
  })
  @ApiParam({
    required: true,
    name: 'id',
    type: String,
    example: '1',
    description: 'Id',
  })
  @ApiResponse({ status: 200, type: UpdateStatusDTO, description: 'Success' })
  async updateStatus(
    @Param('id') id: string,
    @Request() req,
    @Body(ValidationPipe) updateStatusDTO: UpdateStatusDTO,
    @I18nLang() lang: string,
  ) {
    this.checkController.checkStatusUser(id, req?.user?.id);
    return this.service.updateStatus(id, updateStatusDTO, lang);
  }

  @Put('update/change-password')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequireRoles(ROLES.ROLE_ADMIN)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{token}}',
  })
  async changePassword(
    @Request() req,
    @Body(ValidationPipe) changePasswordDTO: ChangePasswordDTO,
    @I18nLang() lang: string,
  ) {
    return this.service.changePassword(req, changePasswordDTO);
  }

  @Put('change-location')
  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{token}}',
  })
  async changeLocation(
    @Request() req,
    @Body(ValidationPipe) changeLocation: ChangeLocationDTO,
    @I18nLang() lang: string,
  ) {
    return this.service.changeLocation(req, changeLocation);
  }

  @Put('update-email/change-password')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequireRoles(ROLES.ROLE_ADMIN)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{token}}',
  })
  async emailChangePassword(
    @Request() req,
    @Body(ValidationPipe) changePasswordDTO: ChangePasswordEmailDTO,
    @I18nLang() lang: string,
  ) {
    return this.service.emailChangePassword(req, changePasswordDTO, lang);
  }
}
