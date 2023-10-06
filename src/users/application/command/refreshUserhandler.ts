import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { AbstractAuthService } from '../adapter/abstractAuth.service';
import { ResponseBody } from 'src/common/class/responseBody.class';
import { RefreshUserCommand } from './refreshUser.command';

@Injectable()
@CommandHandler(RefreshUserCommand)
export class RefreshUserHandler implements ICommandHandler<RefreshUserCommand> {
  constructor(private authService: AbstractAuthService) {}

  async execute(command: RefreshUserCommand) {
    const { refreshToken } = command;

    const accessToken = await this.authService.refresh(refreshToken);

    return new ResponseBody({ data: { accessToken } });
  }
}
