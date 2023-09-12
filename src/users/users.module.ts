import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infra/db/entity/user.entity';
import { DatabaseModule } from 'src/common/library/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './infra/db/repository/user.repository';
import { SMSModule } from 'src/common/SMS/SMS.module';
import { SMSService } from 'src/common/SMS/SMS.service';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersController } from './interface/users.controller';
import { CreateUserHandler } from './application/command/createUser.handler';
import { UserFactory } from './domain/user.factory';

const commandHandlers = [CreateUserHandler];

const factories = [UserFactory];

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(jwtConfig),
    TypeOrmModule.forFeature([User]),
    DatabaseModule,
    SMSModule,
    CqrsModule,
  ],
  controllers: [UsersController],
  providers: [
    AuthService,
    JwtStrategy,
    UserRepository,
    SMSService,
    ...commandHandlers,
    ...factories,
  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule],
})
export class UsersModule {}
