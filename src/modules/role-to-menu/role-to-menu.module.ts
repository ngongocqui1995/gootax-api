import { forwardRef, Module } from '@nestjs/common';
import { RoleToMenuService } from './role-to-menu.service';
import { RoleToMenuController } from './role-to-menu.controller';
import { BaseService } from 'src/common/base.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RoleToMenu } from './entities/role-to-menu.entity';
import { RolesModule } from '../roles/roles.module';
import { MenusModule } from '../menus/menus.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([RoleToMenu]),
    forwardRef(() => RolesModule),
    forwardRef(() => MenusModule),
  ],
  exports: [TypeOrmModule, RoleToMenuService],
  controllers: [RoleToMenuController],
  providers: [RoleToMenuService, BaseService],
})
export class RoleToMenuModule {}
