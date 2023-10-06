import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { SendAuthSMSCommand } from './sendAuthSMS.command';
import { AbstractAuthService } from '../adapter/abstractAuth.service';
import { ResponseBody } from 'src/common/class/responseBody.class';

@Injectable()
@CommandHandler(SendAuthSMSCommand)
export class SendAuthSMSHandler implements ICommandHandler<SendAuthSMSCommand> {
  constructor(private authService: AbstractAuthService) {}

  async execute(command: SendAuthSMSCommand) {
    const { mobileNumber } = command;

    await this.authService.sendAuthSMS(mobileNumber);

    return new ResponseBody({ message: '인증번호가 발송되었습니다.' });
  }
}
