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
import { CreateRoadDto } from './dto/create-road.dto';
import { UpdateRoadDto } from './dto/update-road.dto';
import { Road } from './entities/road.entity';
import { RoadsService } from './roads.service';

@Crud({
  model: {
    type: Road,
  },
  dto: {
    create: CreateRoadDto,
    update: UpdateRoadDto,
  },
  query: {
    join: {
      province: {
        allow: undefined,
      },
      district: {
        allow: undefined,
      },
      ward: {
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
@ApiTags('Roads')
@Controller('roads')
export class RoadsController implements CrudController<Road> {
  model_name: string = ENUM_MODEL.WARD;

  constructor(
    public service: RoadsService,
    private checkController: BaseController,
  ) {}

  get base(): CrudController<Road> {
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
    @ParsedBody() dto: CreateRoadDto,
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
    @ParsedBody() dto: CreateRoadDto,
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
    @ParsedBody() dto: CreateRoadDto,
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
