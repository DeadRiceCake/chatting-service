import { TeamService } from '../application/TeamService';
import { JsonController, Get, Post, Res, HttpCode, QueryParams, Body, Put, Param } from 'routing-controllers';
import { Paging } from '../../../common/model/PagingModel';
import { Response } from 'express';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Service, Inject } from 'typedi';
import { Team } from '../model/entity/TeamModel';
import { CreateTeamDto, UpdateTeamDto } from '../model/dto/TeamDto';
import { RESPONSE_CODE } from '../../../config/StatusCode';
import { CreateTeamResponse, UpdateTeamResponse } from '../response/TeamResponse';
import { ResponseBody } from '../../../common/model/Response';
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
  public async getAllTeams(@QueryParams() paging: Paging, @Res() res: Response) {
    try {
      const allTeams = await this.teamService.getAllTeams(paging);

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
    statusCode: RESPONSE_CODE.SUCCESS.CREATED,
  })
  @ResponseSchema(ResponseBody)
  public async createTeam(@Body() createTeamDto: CreateTeamDto) {
    try {
      await this.teamService.createTeam(createTeamDto);

      return new CreateTeamResponse(createTeamDto);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @HttpCode(RESPONSE_CODE.SUCCESS.OK)
  @Put('/:id')
  @OpenAPI({
    summary: 'team 수정',
    statusCode: RESPONSE_CODE.SUCCESS.OK,
  })
  @ResponseSchema(ResponseBody)
  public async updateTeam(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    try {
      await this.teamService.updateTeamById(id, updateTeamDto);

      return new UpdateTeamResponse(updateTeamDto);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
