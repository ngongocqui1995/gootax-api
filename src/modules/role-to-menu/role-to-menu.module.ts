import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { MenusModule } from '../menus/menus.module';
import { RolesModule } from '../roles/roles.module';
import { RoleToMenu } from './entities/role-to-menu.entity';
import { RoleToMenuController } from './role-to-menu.controller';
import { RoleToMenuService } from './role-to-menu.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([RoleToMenu]),
    forwardRef(() => RolesModule),
    forwardRef(() => MenusModule),
  ],
  exports: [RoleToMenuService],
  controllers: [RoleToMenuController],
  providers: [RoleToMenuService, BaseService],
})
export class RoleToMenuModule {}
