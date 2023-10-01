import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseController } from 'src/common/base.controller';
import { BaseService } from 'src/common/base.service';
import { CustomersModule } from 'src/modules/customers/customers.module';
import { Role } from 'src/modules/roles/entities/role.entity';
import { RolesService } from 'src/modules/roles/roles.service';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';
import { PasswordHasherService } from './password-hasher/password-hasher.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    TypeOrmModule.forFeature([User, Role]),
    forwardRef(() => CustomersModule),
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
  exports: [AuthService],
})
export class AuthModule {}
