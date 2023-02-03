import { TeamService } from '../application/TeamService';
import { JsonController, Get, Post, Res, HttpCode, QueryParams, Body } from 'routing-controllers';
import { Paging } from '../../../common/model/PagingModel';
import { Response } from 'express';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Service, Inject } from 'typedi';
import { Team } from '../model/TeamModel';
import { RESPONSE_CODE } from '../../../config/StatusCode';
import { CreateTeamResponse } from '../response/TeamResponse';

@JsonController('/teams')
@Service()
export class TeamController {
  private teamService: TeamService;

  constructor(@Inject() teamService: TeamService) {
    this.teamService = teamService;
  }

  @HttpCode(200)
  @Get('')
  @OpenAPI({
    summary: 'team 목록 조회',
    statusCode: '200',
    responses: {
      '204': {
        description: 'No Content',
      },
    },
  })
  @ResponseSchema(Team)
  public async getAll(@QueryParams() paging: Paging, @Res() res: Response) {
    try {
      const allTeams = await this.teamService.getAllTeam(paging.offset, paging.limit, paging.sort);

      if (!allTeams.length) {
        return res.status(204).send(allTeams);
      }

      return allTeams;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @HttpCode(RESPONSE_CODE.SUCCESS.CREATED)
  @Post('')
  @OpenAPI({
    summary: 'team 추가',
    statusCode: '201',
  })
  public async create(@Body() team: Team, @Res() res: Response) {
    try {
      await this.teamService.createTeam(team.name, team.league);

      return res.status(RESPONSE_CODE.SUCCESS.CREATED).json(new CreateTeamResponse(team));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
