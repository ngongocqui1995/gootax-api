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
import { CreateRoleDto } from '../roles/dto/create-role.dto';
import { CreateTypeCarDto } from './dto/create-type-car.dto';
import { UpdateTypeCarDto } from './dto/update-type-car.dto';
import { TypeCar } from './entities/type-car.entity';
import { TypeCarsService } from './type-cars.service';

@Crud({
  model: {
    type: TypeCar,
  },
  dto: {
    create: CreateTypeCarDto,
    update: UpdateTypeCarDto,
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
@ApiTags('Type-Cars')
@Controller('type-cars')
export class TypeCarsController implements CrudController<TypeCar> {
  model_name: string = ENUM_MODEL.TYPE_CAR;

  constructor(
    public service: TypeCarsService,
    private checkController: BaseController,
  ) {}

  get base(): CrudController<TypeCar> {
    return this;
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{token}}',
  })
  @Override()
  getMany(@ParsedRequest() req: CrudRequest) {
    return this.service.getManyBase(req);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{token}}',
  })
  @Override('getOneBase')
  getOneAndDoStuff(@ParsedRequest() req: CrudRequest) {
    return this.base.getOneBase(req);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequireRoles(ROLES.ROLE_ROOT, ROLES.ROLE_ADMIN)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{token}}',
  })
  @Override('updateOneBase')
  coolFunction(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateRoleDto,
    @I18nLang() lang: string,
  ) {
    return this.service.updateOneBase(id, req, dto, lang);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequireRoles(ROLES.ROLE_ROOT, ROLES.ROLE_ADMIN)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{token}}',
  })
  @Override('replaceOneBase')
  awesomePUT(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateRoleDto,
    @I18nLang() lang: string,
  ) {
    return this.service.replaceOneBase(id, req, dto, lang);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequireRoles(ROLES.ROLE_ROOT, ROLES.ROLE_ADMIN)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{token}}',
  })
  @Override()
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateRoleDto,
    @I18nLang() lang: string,
  ) {
    return this.service.createOneBase(req, dto, lang);
  }

  @Put('status/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequireRoles(ROLES.ROLE_ROOT, ROLES.ROLE_ADMIN)
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
}
