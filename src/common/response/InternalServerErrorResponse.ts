import { RESPONSE_DESCRIPTION } from '../../config/Description';
import { RESPONSE_STATUS } from '../../config/Status';
import { ResponseBody } from './Response';

export class InternalServerErrorResponse extends ResponseBody<string> {
  constructor(internalServerErrorResponse: string) {
    super(
      RESPONSE_STATUS.SERVER_ERROR.INTERNAL,
      RESPONSE_DESCRIPTION.SERVER_ERROR.INTERNAL_ERROR,
      internalServerErrorResponse,
    );
  }
}
