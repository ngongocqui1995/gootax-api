import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseController } from 'src/common/base.controller';
import { BaseService } from 'src/common/base.service';
import { RoleToMenuModule } from '../role-to-menu/role-to-menu.module';
import { Permission } from './entities/permission.entity';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Permission]),
    forwardRef(() => RoleToMenuModule),
  ],
  exports: [PermissionService],
  controllers: [PermissionController],
  providers: [PermissionService, BaseService, BaseController],
})
export class PermissionModule {}
