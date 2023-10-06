import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { SendAuthSMSCommand } from './sendAuthSMS.command';
import { AbstractAuthService } from '../adapter/abstractAuth.service';

@Injectable()
@CommandHandler(SendAuthSMSCommand)
export class SendAuthSMSHandler implements ICommandHandler<SendAuthSMSCommand> {
  constructor(private authService: AbstractAuthService) {}

  async execute(command: SendAuthSMSCommand) {
    const { mobileNumber } = command;

    await this.authService.sendAuthSMS(mobileNumber);

    return '인증번호가 발송되었습니다.';
  }
}
