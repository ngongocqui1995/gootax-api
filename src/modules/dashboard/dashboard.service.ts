import { HttpStatus, Injectable } from '@nestjs/common';
import { ENUM_STATUS, ENUM_STATUS_BOOK } from 'src/common';
import { BaseService } from 'src/common/base.service';
import { Connection } from 'typeorm';
import { BookCar } from '../book-cars/entities/book-car.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Driver } from '../drivers/entities/driver.entity';

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
      const total_customer = queryRunner.manager
        .getRepository(Customer)
        .createQueryBuilder('customer')
        .select('count(customer.id)', 'sum')
        .where('status = :status', { status: ENUM_STATUS.ACTIVE })
        .getRawOne();
      const total_driver = queryRunner.manager
        .getRepository(Driver)
        .createQueryBuilder('driver')
        .select('count(driver.id)', 'sum')
        .where('status = :status', { status: ENUM_STATUS.ACTIVE })
        .getRawOne();
      const results = (
        await Promise.allSettled([
          total_order,
          total_amount,
          total_customer,
          total_driver,
        ])
      ).map((it) => (it.status === 'fulfilled' ? +it.value.sum : 0));

      data['total_order'] = results[0];
      data['total_amount'] = results[1];
      data['total_customer'] = results[2];
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
      const total_amount = queryRunner.manager
        .getRepository(BookCar)
        .createQueryBuilder('book')
        .select('sum(book.amount)', 'sum')
        .addSelect(`TO_CHAR("createdAt"::DATE, 'dd/mm/yyyy') as createdAt`)
        .addSelect(`'Doanh số' as title`)
        .where('status = :status', { status: ENUM_STATUS_BOOK.COMPLETED })
        .andWhere('"createdAt" between :from_date and :to_date', {
          from_date,
          to_date,
        })
        .groupBy('createdAt')
        .orderBy({ createdAt: 'ASC' })
        .getRawMany();

      const total_order = queryRunner.manager
        .getRepository(BookCar)
        .createQueryBuilder('book')
        .select('count(book.id)', 'sum')
        .addSelect(`TO_CHAR("createdAt"::DATE, 'dd/mm/yyyy') as createdAt`)
        .addSelect(`'Đơn hàng' as title`)
        .where('status = :status', { status: ENUM_STATUS_BOOK.COMPLETED })
        .andWhere('"createdAt" between :from_date and :to_date', {
          from_date,
          to_date,
        })
        .groupBy('createdAt')
        .orderBy({ createdAt: 'ASC' })
        .getRawMany();

      const results = (
        await Promise.allSettled([total_amount, total_order])
      ).map((item) => (item.status === 'fulfilled' ? item.value : []));

      data.push(...results[0]);
      data.push(...results[1]);

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
    let data = [];
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

      const sum = results[0] + results[1];
      data.push({ type: 'Thành công', value: (results[0] / sum) * 100 });
      data.push({ type: 'Huỷ', value: (results[1] / sum) * 100 });

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
