import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DatabaseModule } from 'src/common/library/database/database.module';
import { AuthController } from './auth.controller';
import { userProviders } from './user.providers';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User]), DatabaseModule],
  controllers: [AuthController],
  providers: [...userProviders, AuthService, UserRepository],
})
export class AuthModule {}
