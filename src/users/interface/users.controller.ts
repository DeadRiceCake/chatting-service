import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SignUpRequest } from './dto/signupRequest.dto';
import { CreateUserCommand } from '../application/command/createUser.command';
import { SendAuthSMSRequest } from './dto/sendAuthSMSRequest.dto';
import { SendAuthSMSCommand } from '../application/command/sendAuthSMS.command';
import { GetUserQuery } from '../application/query/getUser.Query';
import { SignInUserCommand } from '../application/command/signInUser.command';
import { RefreshUserRequest } from './dto/refreshUserRequest.dto';
import { RefreshUserCommand } from '../application/command/refreshUser.command';

@Controller('users')
export class UsersController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post('/sms')
  public async sendAuthSMS(@Body() sendAuthSMSRequest: SendAuthSMSRequest) {
    const { mobileNumber } = sendAuthSMSRequest;
    const command = new SendAuthSMSCommand(mobileNumber);

    return await this.commandBus.execute(command);
  }

  @Post('/signup')
  createUser(@Body() signUpRequest: SignUpRequest) {
    const { mobileNumber, authNumber } = signUpRequest;
    const command = new CreateUserCommand(mobileNumber, authNumber);

    return this.commandBus.execute(command);
  }

  @Post('/signin')
  signInUser(@Body() signInRequest: SignUpRequest) {
    const { mobileNumber, authNumber } = signInRequest;
    const command = new SignInUserCommand(mobileNumber, authNumber);

    return this.commandBus.execute(command);
  }

  @Post('/refresh')
  refreshUser(@Body() refreshUserRequest: RefreshUserRequest) {
    const { refreshToken } = refreshUserRequest;
    const command = new RefreshUserCommand(refreshToken);

    return this.commandBus.execute(command);
  }

  @Get('/:userId')
  getUser(@Param('userId') id: string) {
    const query = new GetUserQuery(id);

    return this.queryBus.execute(query);
  }
}
