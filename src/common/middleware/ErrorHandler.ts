import { Request, Response } from 'express';
import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import { RESPONSE_CODE } from '../../config/StatusCode';
import { InternalServerErrorResponse } from '../model/Response';

/**
 * Error를 처리하는 미들웨어
 */
@Service()
@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: Error, req: Request, res: Response): Response {
    console.log(error);
    return res.status(RESPONSE_CODE.SERVER_ERROR.INTERNAL).json(new InternalServerErrorResponse(error.name));
  }
}
