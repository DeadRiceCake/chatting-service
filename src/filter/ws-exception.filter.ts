import { Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch(WsException)
export class WebSocketExceptionsFilter extends BaseWsExceptionFilter {
  private logger = new Logger(this.constructor.name);

  catch(exception: WsException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient() as WebSocket;
    const data = host.switchToWs().getData();
    const error = exception.getError();
    const details = { message: error };

    this.logger.error(error);

    client.send(
      JSON.stringify({
        event: 'error',
        data: {
          id: (client as any).id,
          rid: data.rid,
          ...details,
        },
      }),
    );
  }
}
