import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { BaseService } from '../../common/base.service';
import { ConfigModule } from '@nestjs/config';
import { PasswordHasherService } from 'src/auth/password-hasher/password-hasher.service';
import { BaseController } from 'src/common/base.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Role]),
    forwardRef(() => UsersModule),
  ],
  exports: [TypeOrmModule, RolesService],
  controllers: [RolesController],
  providers: [RolesService, BaseService, PasswordHasherService, BaseController],
})
export class RolesModule {}
