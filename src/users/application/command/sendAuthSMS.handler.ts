import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { SendAuthSMSCommand } from './sendAuthSMS.command';
import { AuthService } from 'src/auth/application/auth.service';

@Injectable()
@CommandHandler(SendAuthSMSCommand)
export class SendAuthSMSHandler implements ICommandHandler<SendAuthSMSCommand> {
  constructor(private authService: AuthService) {}

  async execute(command: SendAuthSMSCommand): Promise<void> {
    const { mobileNumber } = command;

    await this.authService.sendAuthSMS(mobileNumber);
  }
}
