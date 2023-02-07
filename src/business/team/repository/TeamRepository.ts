import { Service } from 'typedi';
import { execute } from '../../../common/module/Database';
import { Team } from '../model/entity/TeamModel';
import { teamQuery } from './TeamQuery';
import { DMLResult } from '../../../common/model/DMLResultModel';
import { CreateTeamDto, UpdateTeamDto } from '../model/dto/TeamDto';
import { Paging } from '../../../common/model/PagingModel';

@Service()
export class TeamRepository {
  /**
   * 모든 팀 정보를 DB에서 조회한다.
   * @param paging 페이징 DTO
   */
  public async selectAllTeams(paging: Paging): Promise<Team[]> {
    try {
      let query = teamQuery.selectTeamListOrderByIdASC;

      if (paging.sort === 'desc') {
        query = teamQuery.selectTeamListOrderByIdDESC;
      }

      const executeQueryResult = await execute<Team[]>(query, [paging.offset, paging.limit]);

      return executeQueryResult;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * 팀을 생성한다.
   * @param createTeamDto 팀 생성 DTO
   */
  public async insertTeam(createTeamDto: CreateTeamDto): Promise<DMLResult> {
    try {
      const executeQueryResult = await execute<DMLResult>(teamQuery.insertTeam, [
        createTeamDto.name,
        createTeamDto.league,
      ]);

      return executeQueryResult;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * id를 기준으로 팀을 수정한다.
   * @param id 팀 id
   * @param updateTeamDto 팀 수정 DTO
   */
  public async updateTeamById(id: string, updateTeamDto: UpdateTeamDto): Promise<DMLResult> {
    try {
      const executeQueryResult = await execute<DMLResult>(teamQuery.updateTeamById, [
        updateTeamDto.name,
        updateTeamDto.league,
        updateTeamDto.isActive,
        id,
      ]);

      return executeQueryResult;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
