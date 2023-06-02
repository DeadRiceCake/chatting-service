import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  public use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent');

    res.on('finish', () => {
      const { statusCode, statusMessage } = res;
      const logFormat = `[${method}] [${originalUrl}] [${statusCode}] [${statusMessage}] [${userAgent}] [${ip}]`;

      if (statusCode >= 400) {
        this.logger.error(logFormat);
      } else {
        this.logger.log(logFormat);
      }
    });

    next();
  }
}
