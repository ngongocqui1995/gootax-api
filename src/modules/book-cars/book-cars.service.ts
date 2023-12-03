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
import { subMinutes } from 'date-fns';
import { I18nLang } from 'nestjs-i18n';
import { ENUM_MODEL, ENUM_STATUS_BOOK } from 'src/common';
import { BaseService } from 'src/common/base.service';
import { UpdateStatusDTO } from 'src/common/dto/update-status.dto';
import { Connection } from 'typeorm';
import { CreateBookCarDto } from './dto/create-book-car.dto';
import { UpdateBookCarDto } from './dto/update-book-car.dto';
import { BookCar } from './entities/book-car.entity';

@Injectable()
export class BookCarsService extends TypeOrmCrudService<BookCar> {
  model_name: string = ENUM_MODEL.BOOK_CAR;
  status_name: string = ENUM_MODEL.STATUS;

  constructor(
    @InjectRepository(BookCar) repo,
    private checkService: BaseService,
    private connection: Connection,
  ) {
    super(repo);
  }

  get base(): CrudService<BookCar> {
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
    @ParsedBody() dto: CreateBookCarDto,
    @I18nLang() lang: string,
  ) {
    const [err] = await to(
      this.replaceOne(req, <BookCar>{
        ...dto,
        type_car: { id: dto.type_car?.toString() },
        from_address_province: { id: dto.from_address_province?.toString() },
        from_address_district: { id: dto.from_address_district?.toString() },
        from_address_ward: { id: dto.from_address_ward?.toString() },
        from_address_road: { id: dto.from_address_road?.toString() },
        to_address_province: { id: dto.to_address_province?.toString() },
        to_address_district: { id: dto.to_address_district?.toString() },
        to_address_ward: { id: dto.to_address_ward?.toString() },
        to_address_road: { id: dto.to_address_road?.toString() },
        customer: { id: dto.customer?.toString() },
        driver: { id: dto.driver?.toString() },
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
    @ParsedBody() dto: UpdateBookCarDto,
    @I18nLang() lang: string,
  ) {
    const [err] = await to(
      this.updateOne(req, <BookCar>{
        ...dto,
        type_car: { id: dto.type_car?.toString() },
        from_address_province: { id: dto.from_address_province?.toString() },
        from_address_district: { id: dto.from_address_district?.toString() },
        from_address_ward: { id: dto.from_address_ward?.toString() },
        from_address_road: { id: dto.from_address_road?.toString() },
        to_address_province: { id: dto.to_address_province?.toString() },
        to_address_district: { id: dto.to_address_district?.toString() },
        to_address_ward: { id: dto.to_address_ward?.toString() },
        to_address_road: { id: dto.to_address_road?.toString() },
        customer: { id: dto.customer?.toString() },
        driver: { id: dto.driver?.toString() },
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
    @ParsedBody() dto: CreateBookCarDto,
    @I18nLang() lang: string,
  ) {
    let from_address = dto.from_address;
    if (!from_address && dto.from_address_lat && dto.from_address_lng) {
      // const res = await axios.get(
      //   `https://maps.googleapis.com/maps/api/geocode/json`,
      //   {
      //     params: {
      //       key: process.env.GOOGLE_MAPS_API_KEY,
      //       latlng: [dto.from_address_lat, dto.from_address_lng].toString(),
      //     },
      //   },
      // );
      // from_address = res.data?.results?.[0]?.formatted_address || '';
    }

    const [err] = await to(
      this.createOne(req, <BookCar>{
        ...dto,
        type_car: { id: dto.type_car?.toString() },
        from_address,
        from_address_province: { id: dto.from_address_province?.toString() },
        from_address_district: { id: dto.from_address_district?.toString() },
        from_address_ward: { id: dto.from_address_ward?.toString() },
        from_address_road: { id: dto.from_address_road?.toString() },
        to_address_province: { id: dto.to_address_province?.toString() },
        to_address_district: { id: dto.to_address_district?.toString() },
        to_address_ward: { id: dto.to_address_ward?.toString() },
        to_address_road: { id: dto.to_address_road?.toString() },
        customer: { id: dto.customer?.toString() },
        driver: { id: dto.driver?.toString() },
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
        .update(BookCar)
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

  async scheduleCancelBook() {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const date = new Date();
      await queryRunner.manager
        .createQueryBuilder()
        .update(BookCar)
        .set({ status: ENUM_STATUS_BOOK.CANCELED })
        .where('driver = null')
        .andWhere('updatedAt between :start and :end', {
          start: subMinutes(date, 5),
          end: date,
        })
        .execute();

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      this.checkService.throwErrorSystem(err.message);
    } finally {
      await queryRunner.release();
    }
  }
}
