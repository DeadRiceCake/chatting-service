import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SignUpRequest } from '../dto/signupRequest.dto';
import { CreateUserCommand } from '../application/command/createUser.command';

@Controller('users')
export class UsersController {
  constructor(private commandBus: CommandBus) {}

  @Post('/signup')
  createUser(@Body() signUpRequest: SignUpRequest) {
    const { mobileNumber, nickname } = signUpRequest;

    const command = new CreateUserCommand(mobileNumber, nickname);

    return this.commandBus.execute(command);
  }
}
