import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BaseService } from 'src/common/base.service';
import { PasswordHasherService } from 'src/auth/password-hasher/password-hasher.service';
import { BaseController } from 'src/common/base.controller';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    forwardRef(() => RolesModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, BaseService, PasswordHasherService, BaseController],
  exports: [UsersService],
})
export class UsersModule {}
