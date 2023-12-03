import { HttpStatus, Injectable, Param, Request } from '@nestjs/common';
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
import { PasswordHasherService } from 'src/auth/password-hasher/password-hasher.service';
import { ENUM_MODEL, ENUM_STATUS_BOOK } from 'src/common';
import { BaseService } from 'src/common/base.service';
import { UpdateStatusDTO } from 'src/common/dto/update-status.dto';
import { Connection, Not } from 'typeorm';
import { BookCar } from '../book-cars/entities/book-car.entity';
import { ChangePasswordEmailDTO } from '../users/dto/change-password-email.dto';
import { ChangePasswordDTO } from '../users/dto/change-password.dto';
import { ChangeLocationDTO } from './dto/change-location.dto';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriversService extends TypeOrmCrudService<Driver> {
  model_name: string = ENUM_MODEL.DRIVER;
  status_name: string = ENUM_MODEL.STATUS;

  constructor(
    @InjectRepository(Driver) repo,
    private checkService: BaseService,
    private hashService: PasswordHasherService,
    private connection: Connection,
  ) {
    super(repo);
  }

  get base(): CrudService<Driver> {
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
    @ParsedBody() dto: CreateDriverDto,
    @I18nLang() lang: string,
  ) {
    const phoneExist = await this.findOne({
      where: { phone: dto.phone, id: Not(id) },
    });
    this.checkService.checkPhoneExist(!!phoneExist);

    delete dto.password;
    const [err] = await to(
      this.replaceOne(req, <Driver>{
        ...dto,
        car: { id: dto.car.toString() },
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
    @ParsedBody() dto: UpdateDriverDto,
    @I18nLang() lang: string,
  ) {
    const phoneExist = await this.findOne({
      where: { phone: dto.phone, id: Not(id) },
    });
    this.checkService.checkPhoneExist(!!phoneExist);

    delete dto.password;
    const [err] = await to(
      this.updateOne(req, <Driver>{
        ...dto,
        car: { id: dto.car.toString() },
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
    @ParsedBody() dto: CreateDriverDto,
    @I18nLang() lang: string,
  ) {
    const phoneExist = await this.findOne({
      where: { phone: dto.phone },
    });
    this.checkService.checkPhoneExist(!!phoneExist);

    const encryptedPassword = this.hashService.hashPassword(dto.password);
    const [err] = await to(
      this.createOne(req, <Driver>{
        ...dto,
        password: encryptedPassword,
        car: { id: dto.car.toString() },
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
        .update(Driver)
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

  async changePassword(@Request() req, changePasswordDTO: ChangePasswordDTO) {
    // verify user password
    const user = await this.findOne({ where: { id: req.user.id } });
    const matchedPassword = await this.hashService.comparePassword(
      changePasswordDTO.current_password,
      user.password,
    );
    this.checkService.checkPasswordValid(matchedPassword);
    this.checkService.comparePassword(
      changePasswordDTO.new_password,
      changePasswordDTO.confirm_password,
    );

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const encryptedPassword = this.hashService.hashPassword(
        changePasswordDTO.new_password,
      );

      await queryRunner.manager
        .createQueryBuilder()
        .update(Driver)
        .set({ password: encryptedPassword })
        .where('id = :id', { id: req.user.id })
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
        'messages.RESET_PASSWORD.PASSWORD_CHANGED',
      ),
    };
  }

  async changeLocation(@Request() req, changeLocation: ChangeLocationDTO) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .createQueryBuilder()
        .update(Driver)
        .set({
          current_lat: changeLocation.current_lat,
          current_lng: changeLocation.current_lng,
        })
        .where('id = :id', { id: req.user.id })
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
        'messages.RESET_PASSWORD.PASSWORD_CHANGED',
      ),
    };
  }

  async emailChangePassword(
    @Request() req,
    changePasswordDTO: ChangePasswordEmailDTO,
    @I18nLang() lang: string,
  ) {
    // verify user password
    this.checkService.comparePassword(
      changePasswordDTO.new_password,
      changePasswordDTO.confirm_password,
    );

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const encryptedPassword = this.hashService.hashPassword(
        changePasswordDTO.new_password,
      );

      await queryRunner.manager
        .createQueryBuilder()
        .update(Driver)
        .set({ password: encryptedPassword })
        .where('id = :id', { id: changePasswordDTO.user })
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
        'messages.RESET_PASSWORD.PASSWORD_CHANGED',
      ),
    };
  }

  async receiveOrder(id: string, @Request() req, @I18nLang() lang: string) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const data = await queryRunner.manager
        .getRepository(BookCar)
        .createQueryBuilder()
        .setLock('pessimistic_write')
        .where('id = :id and status = :status', {
          id,
          status: ENUM_STATUS_BOOK.FINDING,
        })
        .getMany();

      if (data.length === 0) throw new Error('Đã có người nhận đơn!');

      await queryRunner.manager
        .createQueryBuilder()
        .setLock('pessimistic_write')
        .update(BookCar)
        .set({
          status: ENUM_STATUS_BOOK.PICKING,
          driver: req.user.id,
        })
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
