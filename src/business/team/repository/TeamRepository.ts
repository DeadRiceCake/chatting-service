import { Service } from 'typedi';
import { execute } from '../../../common/module/Database';
import { Team } from '../model/TeamModel';
import { teamQuery } from './TeamQuery';
import { DMLResult } from '../../../common/model/DMLResultModel';

@Service()
export class TeamRepository {
  /**
   * 모든 팀 정보를 DB에서 조회한다.
   * @param offset offset
   * @param limit limit
   * @param sort 정렬 기준
   */
  public async selectAllTeams(offset: number, limit: number, sort?: string): Promise<Team[]> {
    try {
      let query = teamQuery.selectTeamListOrderByIdASC;

      if (sort === 'desc') {
        query = teamQuery.selectTeamListOrderByIdDESC;
      }

      const executeQueryResult = await execute<Team[]>(query, [offset, limit]);

      return executeQueryResult;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * 팀을 생성한다.
   * @param name 팀명
   * @param league 리그 명
   */
  public async insertTeam(name: string, league: string): Promise<DMLResult> {
    try {
      const executeQueryResult = await execute<DMLResult>(teamQuery.insertTeam, [name, league]);

      return executeQueryResult;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * id를 기준으로 팀을 수정한다.
   * @param id 팀 id
   * @param name 이름
   * @param league 리그
   * @param isActive 활성 여부
   */
  public async updateTeamById(id: string, name: string, league: string, isActive: boolean): Promise<DMLResult> {
    try {
      const executeQueryResult = await execute<DMLResult>(teamQuery.updateTeamById, [name, league, isActive, id]);

      return executeQueryResult;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
