import { TeamService } from '../application/TeamService';
import { JsonController, Get, Res, HttpCode, QueryParams } from 'routing-controllers';
import { SelectAllTeamModel } from '../model/TeamModel';
import { Response } from 'express';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Service, Inject } from 'typedi';

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
  @ResponseSchema(SelectAllTeamModel)
  public async getAll(@QueryParams() selectAllTeamModel: SelectAllTeamModel, @Res() res: Response) {
    try {
      const allTeams = await this.teamService.selectAllTeams(
        selectAllTeamModel.offset,
        selectAllTeamModel.limit,
        selectAllTeamModel.sort,
      );

      if (!allTeams.length) {
        return res.status(204).send(allTeams);
      }

      return allTeams;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
