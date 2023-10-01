import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordHasherService } from 'src/auth/password-hasher/password-hasher.service';
import { BaseController } from 'src/common/base.controller';
import { BaseService } from '../../common/base.service';
import { UsersModule } from '../users/users.module';
import { Role } from './entities/role.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Role]),
    forwardRef(() => UsersModule),
  ],
  exports: [RolesService],
  controllers: [RolesController],
  providers: [RolesService, BaseService, PasswordHasherService, BaseController],
})
export class RolesModule {}
