import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway';

@Module({
  imports: [ChatGateway],
})
export class GatewayModule {}
