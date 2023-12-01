import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AllExceptionsFilter } from './common/i18n/exceptions-filter';
import configuration from './config/orm.config';
import { EventModule } from './event/event.module';
import { BookCarsModule } from './modules/book-cars/book-cars.module';
import { CarStyleModule } from './modules/car-style/car-style.module';
import { CarsModule } from './modules/cars/cars.module';
import { CompanyModule } from './modules/company/company.module';
import { CustomersModule } from './modules/customers/customers.module';
import { DistrictsModule } from './modules/districts/districts.module';
import { DriversModule } from './modules/drivers/drivers.module';
import { MapModule } from './modules/map/map.module';
import { MenusModule } from './modules/menus/menus.module';
import { PermissionModule } from './modules/permission/permission.module';
import { ProvincesModule } from './modules/provinces/provinces.module';
import { RoadsModule } from './modules/roads/roads.module';
import { RoleToMenuModule } from './modules/role-to-menu/role-to-menu.module';
import { RolesModule } from './modules/roles/roles.module';
import { TypeCarsModule } from './modules/type-cars/type-cars.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { UsersModule } from './modules/users/users.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { WardsModule } from './modules/wards/wards.module';
import { TaskModule } from './task/task.module';
import { DriverCancelModule } from './modules/driver-cancel/driver-cancel.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(configuration().database),
    I18nModule.forRoot({
      fallbackLanguage: process.env.DEFAULT_LANGUAGE,
      fallbacks: {
        'en-*': 'en',
        'vi-*': 'vi',
      },
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang', 'locale', 'l'] },
        new HeaderResolver(['x-custom-lang']),
        AcceptLanguageResolver,
        new CookieResolver(['lang', 'locale', 'l']),
      ],
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    RoleToMenuModule,
    MenusModule,
    PermissionModule,
    CustomersModule,
    UploadsModule,
    DriversModule,
    BookCarsModule,
    ProvincesModule,
    DistrictsModule,
    WardsModule,
    TypeCarsModule,
    CarsModule,
    CompanyModule,
    VehiclesModule,
    CarStyleModule,
    RoadsModule,
    MapModule,
    EventModule,
    TaskModule,
    DriverCancelModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
