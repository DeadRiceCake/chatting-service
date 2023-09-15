import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SignUpRequest } from './dto/signupRequest.dto';
import { CreateUserCommand } from '../application/command/createUser.command';
import { SendAuthSMSRequest } from './dto/sendAuthSMSRequest.dto';
import { SendAuthSMSCommand } from '../application/command/sendAuthSMS.command';
import { VerifyAuthNumberRequest } from './dto/verifyAuthNumberRequest.dto';
import { VerifyAuthSMSCommand } from '../application/command/verifyAuthSMS.command';
import { GetUserQuery } from '../application/query/getUser.Query';

@Controller('users')
export class UsersController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post('/sms')
  public async sendAuthSMS(@Body() sendAuthSMSRequest: SendAuthSMSRequest) {
    const { mobileNumber } = sendAuthSMSRequest;
    const command = new SendAuthSMSCommand(mobileNumber);

    return await this.commandBus.execute(command);
  }

  @Post('/sms/verify')
  public async verifyAuthSMS(
    @Body() verifyAuthNumberRequest: VerifyAuthNumberRequest,
  ) {
    const { mobileNumber, authNumber } = verifyAuthNumberRequest;
    const command = new VerifyAuthSMSCommand(mobileNumber, authNumber);

    return await this.commandBus.execute(command);
  }

  @Post('/signup')
  createUser(@Body() signUpRequest: SignUpRequest) {
    const { mobileNumber, nickname } = signUpRequest;
    const command = new CreateUserCommand(mobileNumber, nickname);

    return this.commandBus.execute(command);
  }

  @Get('/:userId')
  getUser(@Param('userId') id: string) {
    const query = new GetUserQuery(id);

    return this.queryBus.execute(query);
  }
}
