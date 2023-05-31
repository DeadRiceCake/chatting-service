import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DatabaseModule } from 'src/common/library/database/database.module';
import { AuthController } from './auth.controller';
import { userProviders } from './user.providers';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(jwtConfig),
    TypeOrmModule.forFeature([User]),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [...userProviders, AuthService, JwtStrategy],
  exports: [TypeOrmModule, JwtStrategy, PassportModule],
})
export class AuthModule {}
