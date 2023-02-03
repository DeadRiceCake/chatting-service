import { Service } from 'typedi';
import { execute } from '../../../common/module/Database';
import { Service } from 'typedi';
import { Team } from '../model/TeamModel';

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
}
