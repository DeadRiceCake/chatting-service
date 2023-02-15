import { ResponseBody } from '../../../common/response/Response';
import { RESPONSE_DESCRIPTION } from '../../../config/Description';
import { RESPONSE_STATUS } from '../../../config/Status';

export class CreateTeamResponse extends ResponseBody<object> {
  constructor(name: string, league: string) {
    super(RESPONSE_STATUS.SUCCESS.CREATED, RESPONSE_DESCRIPTION.SUCCESS.CREATED, { created_team: { name, league } });
  }
}

export class UpdateTeamResponse extends ResponseBody<object> {
  constructor(id: string, name: string, league: string, is_active: boolean) {
    super(RESPONSE_STATUS.SUCCESS.OK, RESPONSE_DESCRIPTION.SUCCESS.OK, {
      updated_team: { id, name, league, is_active },
    });
  }
}

export class DeleteTeamResponse extends ResponseBody<unknown> {
  constructor() {
    super(RESPONSE_STATUS.SUCCESS.OK, RESPONSE_DESCRIPTION.SUCCESS.OK);
  }
}
