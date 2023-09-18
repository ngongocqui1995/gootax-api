import { forwardRef, Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { BaseService } from 'src/common/base.service';
import { BaseController } from 'src/common/base.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Menu } from './entities/menu.entity';
import { RoleToMenuModule } from '../role-to-menu/role-to-menu.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Menu]),
    forwardRef(() => RoleToMenuModule),
  ],
  exports: [TypeOrmModule, MenusService],
  controllers: [MenusController],
  providers: [MenusService, BaseService, BaseController],
})
export class MenusModule {}
