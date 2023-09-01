import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DatabaseModule } from 'src/common/library/database/database.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';
import { SMSModule } from 'src/common/SMS/SMS.module';
import { SMSService } from 'src/common/SMS/SMS.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(jwtConfig),
    TypeOrmModule.forFeature([User]),
    DatabaseModule,
    SMSModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserRepository, SMSService],
  exports: [TypeOrmModule, JwtStrategy, PassportModule],
})
export class AuthModule {}
