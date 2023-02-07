import { TeamService } from '../application/TeamService';
import { JsonController, Get, Post, Res, HttpCode, QueryParams, Body, Put, Param } from 'routing-controllers';
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

  @HttpCode(RESPONSE_CODE.SUCCESS.OK)
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
  public async getAllTeams(@QueryParams() paging: Paging, @Res() res: Response) {
    try {
      const allTeams = await this.teamService.getAllTeams(paging.offset, paging.limit, paging.sort);

      if (!allTeams.length) {
        return res.status(RESPONSE_CODE.SUCCESS.NO_CONTENT).send();
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
  @ResponseSchema(CreateTeamResponse)
  public async createTeam(@Body() team: Team) {
    try {
      await this.teamService.createTeam(team.name, team.league);

      return new CreateTeamResponse(team);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @HttpCode(RESPONSE_CODE.SUCCESS.CREATED)
  @Put('/:id')
  @OpenAPI({
    summary: 'team 수정',
    statusCode: '200',
  })
  @ResponseSchema(CreateTeamResponse)
  public async updateTeam(@Param('id') id: string, @Body() team: Team) {
    try {
      const updatedTeam = await this.teamService.updateTeamById(id, team.name, team.league, team.isActive);

      return updatedTeam;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
