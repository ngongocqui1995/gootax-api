import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseController } from 'src/common/base.controller';
import { BaseService } from 'src/common/base.service';
import { RoleToMenuModule } from '../role-to-menu/role-to-menu.module';
import { Menu } from './entities/menu.entity';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Menu]),
    forwardRef(() => RoleToMenuModule),
  ],
  exports: [MenusService],
  controllers: [MenusController],
  providers: [MenusService, BaseService, BaseController],
})
export class MenusModule {}
