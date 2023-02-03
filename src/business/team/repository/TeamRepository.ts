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
  public async selectAllTeam(offset: number, limit: number, sort?: string): Promise<Team[]> {
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
}
