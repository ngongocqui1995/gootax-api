import { HttpStatus, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CrudRequest,
  CrudService,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import to from 'await-to-js';
import { I18nLang } from 'nestjs-i18n';
import { ENUM_MODEL } from 'src/common';
import { BaseService } from 'src/common/base.service';
import { UpdateStatusDTO } from 'src/common/dto/update-status.dto';
import { Connection, Not } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService extends TypeOrmCrudService<Vehicle> {
  model_name: string = ENUM_MODEL.VEHICLE;
  status_name: string = ENUM_MODEL.STATUS;

  constructor(
    @InjectRepository(Vehicle) repo,
    private checkService: BaseService,
    private connection: Connection,
  ) {
    super(repo);
  }

  get base(): CrudService<Vehicle> {
    return this;
  }

  async getManyBase(@ParsedRequest() req: CrudRequest) {
    const { parsed, options } = req;
    const builder = await this.createBuilder(parsed, options);

    return await this.doGetMany(builder, parsed, options);
  }

  async replaceOneBase(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateVehicleDto,
    @I18nLang() lang: string,
  ) {
    const codeExist = await this.findOne({
      where: {
        code: dto.code,
        company: { id: dto.company.toString() },
        id: Not(id),
      },
    });
    this.checkService.checkCodeExist(!!codeExist);

    const [err] = await to(
      this.replaceOne(req, <Vehicle>{
        ...dto,
        company: { id: dto.company.toString() },
      }),
    );
    if (err) this.checkService.throwErrorSystem(err.message);
    return {
      status: HttpStatus.OK,
      message: await this.checkService.i18n.translate(
        'messages.ACTION.UPDATE',
        {
          lang,
          args: [
            {
              name: await this.checkService.i18n.translate(
                'models.' + this.model_name,
              ),
            },
          ],
        },
      ),
    };
  }

  async updateOneBase(
    @Param('id') id: string,
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateVehicleDto,
    @I18nLang() lang: string,
  ) {
    const codeExist = await this.findOne({
      where: {
        code: dto.code,
        company: { id: dto.company.toString() },
        id: Not(id),
      },
    });
    this.checkService.checkCodeExist(!!codeExist);

    const [err] = await to(
      this.updateOne(req, <Vehicle>{
        ...dto,
        company: { id: dto.company.toString() },
      }),
    );
    if (err) this.checkService.throwErrorSystem(err.message);
    return {
      status: HttpStatus.OK,
      message: await this.checkService.i18n.translate(
        'messages.ACTION.UPDATE',
        {
          lang,
          args: [
            {
              name: await this.checkService.i18n.translate(
                'models.' + this.model_name,
              ),
            },
          ],
        },
      ),
    };
  }

  async createOneBase(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateVehicleDto,
    @I18nLang() lang: string,
  ) {
    const codeExist = await this.findOne({
      where: { code: dto.code, company: { id: dto.company.toString() } },
    });
    this.checkService.checkCodeExist(!!codeExist);

    const [err] = await to(
      this.createOne(req, <Vehicle>{
        ...dto,
        company: { id: dto.company.toString() },
      }),
    );
    if (err) this.checkService.throwErrorSystem(err.message);

    return {
      status: HttpStatus.OK,
      message: await this.checkService.i18n.translate(
        'messages.ACTION.CREATE',
        {
          lang,
          args: [
            {
              name: await this.checkService.i18n.translate(
                'models.' + this.model_name,
              ),
            },
          ],
        },
      ),
    };
  }

  async updateStatus(
    id: string,
    updateStatusDTO: UpdateStatusDTO,
    @I18nLang() lang: string,
  ) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .createQueryBuilder()
        .update(Vehicle)
        .set({ status: updateStatusDTO.status })
        .where('id = :id', { id })
        .execute();

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      this.checkService.throwErrorSystem(err.message);
    } finally {
      await queryRunner.release();
    }

    return {
      status: HttpStatus.OK,
      message: await this.checkService.i18n.translate(
        'messages.ACTION.UPDATE',
        {
          lang,
          args: [
            {
              name: await this.checkService.i18n.translate(
                'models.' + this.status_name,
              ),
            },
          ],
        },
      ),
    };
  }
}
