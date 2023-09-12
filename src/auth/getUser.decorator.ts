import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';

const logger = new Logger('USER');

export const GetUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    logger.log(request.user.id);

    return request.user;
  },
);
