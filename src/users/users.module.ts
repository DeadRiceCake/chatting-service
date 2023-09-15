import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infra/db/entity/user.entity';
import { DatabaseModule } from 'src/common/library/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
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
import { VerifyAuthSMSHandler } from './application/command/verifyAuthSMS.handler';
import { AbstractCacheService } from './application/adapter/abstractCache.service';
import { RedisService } from './infra/adapter/cache.service';
import { RedisModule } from 'src/redis/redis.module';

const commandHandlers = [
  CreateUserHandler,
  SendAuthSMSHandler,
  VerifyAuthSMSHandler,
];

const factories = [UserFactory];

const repositories = [
  { provide: AbstractUserRepository, useClass: UserRepository },
];

const adapters = [{ provide: AbstractCacheService, useClass: RedisService }];

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(jwtConfig),
    TypeOrmModule.forFeature([User]),
    DatabaseModule,
    SMSModule,
    CqrsModule,
    AuthModule,
    RedisModule,
  ],
  controllers: [UsersController],
  providers: [
    JwtStrategy,
    SMSService,
    UserRepository,
    ...repositories,
    ...commandHandlers,
    ...factories,
    ...adapters,
  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule],
})
export class UsersModule {}
