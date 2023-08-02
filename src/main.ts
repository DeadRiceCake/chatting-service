import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './config/winston.config';
import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { RedisIoAdapter } from './chat/socket-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: WinstonModule.createLogger(winstonConfig),
  });
  const port = 3000;
  const logger = new Logger();

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();

  app.useWebSocketAdapter(redisIoAdapter);
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port, () => logger.log(`Server running on port ${port}`));
}
bootstrap();
