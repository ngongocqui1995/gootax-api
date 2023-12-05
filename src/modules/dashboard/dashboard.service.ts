import { HttpStatus, Injectable } from '@nestjs/common';
import { ENUM_STATUS, ENUM_STATUS_BOOK } from 'src/common';
import { BaseService } from 'src/common/base.service';
import { Connection } from 'typeorm';
import { BookCar } from '../book-cars/entities/book-car.entity';
import { Driver } from '../drivers/entities/driver.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class DashboardService {
  constructor(
    private connection: Connection,
    private checkService: BaseService,
  ) {}

  async findSituation(from_date: string, to_date: string) {
    let data = {};
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const total_order = queryRunner.manager
        .getRepository(BookCar)
        .createQueryBuilder('book')
        .select('count(book.id)', 'sum')
        .where('status = :status', { status: ENUM_STATUS_BOOK.COMPLETED })
        .andWhere('"createdAt" between :from_date and :to_date', {
          from_date,
          to_date,
        })
        .getRawOne();
      const total_amount = queryRunner.manager
        .getRepository(BookCar)
        .createQueryBuilder('book')
        .select('sum(book.amount)', 'sum')
        .where('status = :status', { status: ENUM_STATUS_BOOK.COMPLETED })
        .andWhere('"createdAt" between :from_date and :to_date', {
          from_date,
          to_date,
        })
        .getRawOne();
      const total_user = queryRunner.manager
        .getRepository(User)
        .createQueryBuilder('user')
        .select('count(user.id)', 'sum')
        .where('status = :status', { status: ENUM_STATUS.ACTIVE })
        .andWhere('"createdAt" between :from_date and :to_date', {
          from_date,
          to_date,
        })
        .getRawOne();
      const total_driver = queryRunner.manager
        .getRepository(Driver)
        .createQueryBuilder('driver')
        .select('count(driver.id)', 'sum')
        .where('status = :status', { status: ENUM_STATUS.ACTIVE })
        .andWhere('"createdAt" between :from_date and :to_date', {
          from_date,
          to_date,
        })
        .getRawOne();
      const results = (
        await Promise.allSettled([
          total_amount,
          total_driver,
          total_user,
          total_order,
        ])
      ).map((it) => (it.status === 'fulfilled' ? +it.value.sum : 0));

      data['total_order'] = results[0];
      data['total_amount'] = results[1];
      data['total_user'] = results[2];
      data['total_driver'] = results[3];

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      this.checkService.throwErrorSystem(err.message);
    } finally {
      await queryRunner.release();
    }

    return {
      status: HttpStatus.OK,
      message: 'Lấy dữ liệu thành công!',
      data,
    };
  }

  async findOrder(from_date: string, to_date: string) {
    let data = [];
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      data = await queryRunner.manager
        .getRepository(BookCar)
        .createQueryBuilder()
        .where('status = :status', { status: ENUM_STATUS_BOOK.COMPLETED })
        .andWhere('"createdAt" between :from_date and :to_date', {
          from_date,
          to_date,
        })
        .getMany();

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      this.checkService.throwErrorSystem(err.message);
    } finally {
      await queryRunner.release();
    }

    return {
      status: HttpStatus.OK,
      message: 'Lấy dữ liệu thành công!',
      data,
    };
  }

  async findOrderStatus(from_date: string, to_date: string) {
    let data = {};
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const total_order_success = queryRunner.manager
        .getRepository(BookCar)
        .createQueryBuilder('book')
        .select('count(book.id)', 'sum')
        .where('status = :status', { status: ENUM_STATUS_BOOK.COMPLETED })
        .andWhere('"createdAt" between :from_date and :to_date', {
          from_date,
          to_date,
        })
        .getRawOne();

      const total_order_cancel = queryRunner.manager
        .getRepository(BookCar)
        .createQueryBuilder('book')
        .select('count(book.id)', 'sum')
        .where('status = :status', { status: ENUM_STATUS_BOOK.CANCELED })
        .andWhere('"createdAt" between :from_date and :to_date', {
          from_date,
          to_date,
        })
        .getRawOne();

      const results = (
        await Promise.allSettled([total_order_success, total_order_cancel])
      ).map((it) => (it.status === 'fulfilled' ? +it.value.sum : 0));
      data['total_order_success'] = results[0];
      data['total_order_cancel'] = results[1];

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      this.checkService.throwErrorSystem(err.message);
    } finally {
      await queryRunner.release();
    }

    return {
      status: HttpStatus.OK,
      message: 'Lấy dữ liệu thành công!',
      data,
    };
  }
}
