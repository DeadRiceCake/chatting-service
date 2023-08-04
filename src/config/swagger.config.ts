import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('KAWAII API')
  .setDescription('귀여운 API')
  .setVersion('1.0')
  .addTag('kawaii')
  .build();
