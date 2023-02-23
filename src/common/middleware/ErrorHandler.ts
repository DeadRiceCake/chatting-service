import { Request, Response } from 'express';
import { Middleware, ExpressErrorMiddlewareInterface, BadRequestError } from 'routing-controllers';
import { Service } from 'typedi';
import { RESPONSE_CODE } from '../../config/StatusCode';
import { CustomError } from '../error/CustomError';
import { InternalServerErrorResponse } from '../response/InternalServerErrorResponse';
import { ResponseBody } from '../response/Response';
import { ValidationErrorResponse } from '../response/ValidationErrorResponse';

/**
 * Error와 Exception을 처리하는 미들웨어
 */
@Service()
@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: Error, req: Request, res: Response): Response {
    console.log(error);

    if (error instanceof BadRequestError) {
      return res.status(RESPONSE_CODE.CLIENT_ERROR.INVALID_ARGUMENT).json(new ValidationErrorResponse(error));
    } else if (error instanceof CustomError) {
      return res.status(error.httpCode).json(new ResponseBody(error.name, error.message, error.data));
    } else {
      return res.status(RESPONSE_CODE.SERVER_ERROR.INTERNAL).json(new InternalServerErrorResponse(error.message));
    }
  }
}
