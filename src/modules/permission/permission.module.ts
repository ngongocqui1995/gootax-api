import { forwardRef, Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Permission } from './entities/permission.entity';
import { BaseService } from 'src/common/base.service';
import { BaseController } from 'src/common/base.controller';
import { RoleToMenuModule } from '../role-to-menu/role-to-menu.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Permission]),
    forwardRef(() => RoleToMenuModule),
  ],
  exports: [TypeOrmModule, PermissionService],
  controllers: [PermissionController],
  providers: [PermissionService, BaseService, BaseController],
})
export class PermissionModule {}
