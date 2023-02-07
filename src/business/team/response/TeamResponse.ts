import { ResponseBody } from '../../../common/model/Response';
import { RESPONSE_DESCRIPTION } from '../../../config/Description';
import { RESPONSE_STATUS } from '../../../config/Status';
import { CreateTeamDto, UpdateTeamDto } from '../model/dto/TeamDto';

export class CreateTeamResponse extends ResponseBody<CreateTeamDto> {
  constructor(createdTeam: CreateTeamDto) {
    super(RESPONSE_STATUS.SUCCESS.CREATED, RESPONSE_DESCRIPTION.SUCCESS.CREATED, createdTeam);
  }
}

export class UpdateTeamResponse extends ResponseBody<UpdateTeamDto> {
  constructor(updateTeamDto: UpdateTeamDto) {
    super(RESPONSE_STATUS.SUCCESS.CREATED, RESPONSE_DESCRIPTION.SUCCESS.CREATED, updateTeamDto);
  }
}
