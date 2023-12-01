import { Controller, Param, Put, Request, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { I18nLang } from 'nestjs-i18n';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ENUM_MODEL } from 'src/common';
import { DriverCancelService } from './driver-cancel.service';
import { CreateDriverCancelDto } from './dto/create-driver-cancel.dto';
import { UpdateDriverCancelDto } from './dto/update-driver-cancel.dto';
import { DriverCancel } from './entities/driver-cancel.entity';

@Crud({
  model: {
    type: DriverCancel,
  },
  dto: {
    create: CreateDriverCancelDto,
    update: UpdateDriverCancelDto,
  },
  query: {
    exclude: ['id'],
  },
  routes: {
    exclude: ['deleteOneBase', 'createManyBase'],
  },
})
@ApiTags('Drivers Cancel')
@Controller('driver-cancel')
export class DriverCancelController implements CrudController<DriverCancel> {
  model_name: string = ENUM_MODEL.DRIVER_CANCEL;

  constructor(public service: DriverCancelService) {}

  get base(): CrudController<DriverCancel> {
    return this;
  }

  @UseGuards(JwtAuthGuard)
  @Override()
  getMany(@ParsedRequest() req) {
    return this.service.getManyBase(req);
  }

  @UseGuards(JwtAuthGuard)
  @Override('getOneBase')
  getOneAndDoStuff(@ParsedRequest() req: CrudRequest) {
    return this.base.getOneBase(req);
  }

  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{token}}',
  })
  @Override('updateOneBase')
  coolFunction(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateDriverCancelDto,
    @I18nLang() lang: string,
  ) {
    return this.service.updateOneBase(req, dto, lang);
  }

  @UseGuards(JwtAuthGuard)
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{token}}',
  })
  @Override('replaceOneBase')
  awesomePUT(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateDriverCancelDto,
    @I18nLang() lang: string,
  ) {
    return this.service.replaceOneBase(req, dto, lang);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer {{token}}',
  })
  @Override()
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateDriverCancelDto,
    @I18nLang() lang: string,
  ) {
    return this.service.createOneBase(req, dto, lang);
  }

  @Put('book-cancel/:id')
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
  async bookCancel(
    @Param('id') id: string,
    @Request() req,
    @I18nLang() lang: string,
  ) {
    return this.service.bookCancel(id, req, lang);
  }
}
