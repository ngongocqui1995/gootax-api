import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
import { RolesService } from 'src/modules/roles/roles.service';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';
import { PasswordHasherService } from './password-hasher/password-hasher.service';
import { BaseController } from 'src/common/base.controller';
import { BaseService } from 'src/common/base.service';
import { UsersService } from 'src/modules/users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    TypeOrmModule.forFeature([User, Role]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    BaseService,
    BaseController,
    PasswordHasherService,
    JwtStrategyService,
    RolesService,
  ],
  exports: [TypeOrmModule, AuthService],
})
export class AuthModule {}
