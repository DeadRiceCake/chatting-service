import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infra/db/entity/user.entity';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from './infra/db/repository/user.repository';
import { SMSModule } from 'src/SMS/SMS.module';
import { SMSService } from 'src/SMS/SMS.service';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersController } from './interface/users.controller';
import { CreateUserHandler } from './application/command/createUser.handler';
import { UserFactory } from './domain/user.factory';
import { AbstractUserRepository } from './domain/repository/abstractUser.reporitory';
import { SendAuthSMSHandler } from './application/command/sendAuthSMS.handler';
import { AuthModule } from 'src/auth/auth.module';
import { RedisModule } from 'src/redis/redis.module';
import { GetUserQueryHandler } from './application/query/getUser.handler';
import { AbstractAuthService } from './application/adapter/abstractAuth.service';
import { AuthService } from './infra/adapter/auth.service';
import { SignInUserHandler } from './application/command/signInUser.handler';

const commandHandlers = [
  CreateUserHandler,
  SendAuthSMSHandler,
  SignInUserHandler,
];

const queryHandlers = [GetUserQueryHandler];

const factories = [UserFactory];

const repositories = [
  { provide: AbstractUserRepository, useClass: UserRepository },
];

const adapters = [{ provide: AbstractAuthService, useClass: AuthService }];

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
    SMSModule,
    CqrsModule,
    AuthModule,
    RedisModule,
  ],
  controllers: [UsersController],
  providers: [
    SMSService,
    UserRepository,
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
    ...factories,
    ...adapters,
  ],
  exports: [TypeOrmModule, PassportModule],
})
export class UsersModule {}
