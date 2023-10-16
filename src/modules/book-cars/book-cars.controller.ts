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
import { BookCarsService } from './book-cars.service';
import { CreateBookCarDto } from './dto/create-book-car.dto';
import { UpdateBookCarDto } from './dto/update-book-car.dto';
import { BookCar } from './entities/book-car.entity';

@Crud({
  model: {
    type: BookCar,
  },
  dto: {
    create: CreateBookCarDto,
    update: UpdateBookCarDto,
  },
  query: {
    join: {
      type_car: {
        allow: undefined,
      },
      from_address_province: {
        allow: undefined,
      },
      from_address_district: {
        allow: undefined,
      },
      from_address_ward: {
        allow: undefined,
      },
      from_address_road: {
        allow: undefined,
      },
      to_address_province: {
        allow: undefined,
      },
      to_address_district: {
        allow: undefined,
      },
      to_address_ward: {
        allow: undefined,
      },
      to_address_road: {
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
@ApiTags('Book-Cars')
@Controller('book-cars')
export class BookCarsController implements CrudController<BookCar> {
  model_name: string = ENUM_MODEL.BOOK_CAR;

  constructor(
    public service: BookCarsService,
    private checkController: BaseController,
  ) {}

  get base(): CrudController<BookCar> {
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
    @ParsedBody() dto: CreateBookCarDto,
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
    @ParsedBody() dto: CreateBookCarDto,
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
    @ParsedBody() dto: CreateBookCarDto,
    @I18nLang() lang: string,
  ) {
    return this.service.createOneBase(req, dto, lang);
  }

  @Put('status/:id')
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
