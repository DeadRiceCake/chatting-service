import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/application/auth.service';
import { VerifyAuthSMSCommand } from './verifyAuthSMS.command';

@Injectable()
@CommandHandler(VerifyAuthSMSCommand)
export class VerifyAuthSMSHandler
  implements ICommandHandler<VerifyAuthSMSCommand>
{
  constructor(private authService: AuthService) {}

  async execute(command: VerifyAuthSMSCommand): Promise<void> {
    const { mobileNumber, authNumber } = command;

    await this.authService.verifyAuthSMS(mobileNumber, authNumber);
  }
}
