import { BadRequestError } from 'routing-controllers';
import { RESPONSE_DESCRIPTION } from '../../config/Description';
import { RESPONSE_STATUS } from '../../config/Status';
import { ResponseBody } from './Response';

export class ValidationErrorResponse extends ResponseBody<BadRequestError> {
  constructor(additionalInfo: BadRequestError) {
    super(RESPONSE_STATUS.CLIENT_ERROR.INVALID_ARGUMENT, RESPONSE_DESCRIPTION.CLIENT_ERROR.INVALID_ARGUMENT);
    this.additionalInfo = additionalInfo;
  }
}
