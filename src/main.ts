import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './config/winston.config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: WinstonModule.createLogger(winstonConfig),
  });
  const port = 3000;
  const logger = new Logger();

  await app.listen(port, () => logger.log(`Server running on port ${port}`));
}
bootstrap();
