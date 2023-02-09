import { TeamService } from '../application/TeamService';
import { JsonController, Get, Post, HttpCode, QueryParams, Body, Put, Param, Delete } from 'routing-controllers';
import { Paging } from '../../../common/model/PagingModel';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Service, Inject } from 'typedi';
import { Team } from '../model/entity/TeamModel';
import { CreateTeamDto, UpdateTeamDto } from '../model/dto/TeamDto';
import { RESPONSE_CODE } from '../../../config/StatusCode';
import { ResponseBody } from '../../../common/response/Response';
import { RESPONSE_DESCRIPTION } from '../../../config/Description';

@JsonController('/teams')
@Service()
export class TeamController {
  private teamService: TeamService;

  constructor(@Inject() teamService: TeamService) {
    this.teamService = teamService;
  }

  @HttpCode(RESPONSE_CODE.SUCCESS.OK)
  @Get('')
  @OpenAPI({
    summary: 'team 목록 조회',
    statusCode: RESPONSE_CODE.SUCCESS.OK,
    responses: {
      [RESPONSE_CODE.SUCCESS.NO_CONTENT]: {
        description: RESPONSE_DESCRIPTION.SUCCESS.NO_CONTENT,
      },
    },
  })
  @ResponseSchema(Team, { isArray: true })
  public async getAllTeams(@QueryParams() paging: Paging) {
    return await this.teamService.getAllTeams(paging);
  }

  @HttpCode(RESPONSE_CODE.SUCCESS.CREATED)
  @Post('')
  @OpenAPI({
    summary: 'team 추가',
    statusCode: RESPONSE_CODE.SUCCESS.CREATED,
  })
  @ResponseSchema(ResponseBody)
  public async createTeam(@Body() createTeamDto: CreateTeamDto) {
    return await this.teamService.createTeam(createTeamDto);
  }

  @HttpCode(RESPONSE_CODE.SUCCESS.OK)
  @Put('/:id')
  @OpenAPI({
    summary: 'team 수정',
    statusCode: RESPONSE_CODE.SUCCESS.OK,
    responses: {
      [RESPONSE_CODE.CLIENT_ERROR.INVALID_ARGUMENT]: {
        description: RESPONSE_DESCRIPTION.CLIENT_ERROR.INVALID_ARGUMENT,
      },
    },
  })
  @ResponseSchema(ResponseBody)
  public async updateTeam(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return await this.teamService.updateTeamById(id, updateTeamDto);
  }

  @HttpCode(RESPONSE_CODE.SUCCESS.OK)
  @Delete('/:id')
  @OpenAPI({
    summary: 'team 삭제',
    statusCode: RESPONSE_CODE.SUCCESS.OK,
  })
  @ResponseSchema(ResponseBody)
  public async deleteTeam(@Param('id') id: string) {
    return await this.teamService.deleteTeamById(id);
  }
}
