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
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { Province } from './entities/province.entity';
import { ProvincesService } from './provinces.service';

@Crud({
  model: {
    type: Province,
  },
  dto: {
    create: CreateProvinceDto,
    update: UpdateProvinceDto,
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
@ApiTags('Provinces')
@Controller('provinces')
export class ProvincesController implements CrudController<Province> {
  model_name: string = ENUM_MODEL.PROVINCE;

  constructor(
    public service: ProvincesService,
    private checkController: BaseController,
  ) {}

  get base(): CrudController<Province> {
    return this;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequireRoles(ROLES.ROLE_ADMIN)
  @Override()
  getMany(@ParsedRequest() req, @Request() request) {
    return this.service.getManyBase(req, request);
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
    @ParsedBody() dto: CreateProvinceDto,
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
    @ParsedBody() dto: CreateProvinceDto,
    @I18nLang() lang: string,
  ) {
    return this.service.replaceOneBase(id, req, dto, lang);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequireRoles(ROLES.ROLE_ADMIN)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{token}}',
  })
  @Override()
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateProvinceDto,
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
}
