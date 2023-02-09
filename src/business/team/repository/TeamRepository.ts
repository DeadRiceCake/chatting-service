import { Service } from 'typedi';
import { execute } from '../../../common/module/Database';
import { Team } from '../model/entity/TeamModel';
import { teamQuery } from './TeamQuery';
import { DMLResult } from '../../../common/model/DMLResultModel';

@Service()
export class TeamRepository {
  /**
   * 모든 팀 정보를 DB에서 조회한다. (페이징 처리), id 오름차순
   * @param offset 조회하려는 페이지 번호
   * @param limit 페이지 당 데이터 개수
   */
  public async selectAllTeamsOrderByIdASC(offset: number, limit: number): Promise<Team[]> {
    const query = teamQuery.selectTeamListOrderByIdASC;

    const executeQueryResult = await execute<Team[]>(query, [offset, limit]);

    return executeQueryResult;
  }

  /**
   * 모든 팀 정보를 DB에서 조회한다. (페이징 처리), id 내림차순
   * @param offset 조회하려는 페이지 번호
   * @param limit 페이지 당 데이터 개수
   */
  public async selectAllTeamsOrderByIdDESC(offset: number, limit: number): Promise<Team[]> {
    const query = teamQuery.selectTeamListOrderByIdDESC;

    const executeQueryResult = await execute<Team[]>(query, [offset, limit]);

    return executeQueryResult;
  }

  /**
   * 팀을 생성한다.
   * @param name 생성할 팀 이름
   * @param league 생성할 팀 리그
   */
  public async insertTeam(name: string, league: string): Promise<DMLResult> {
    return await execute<DMLResult>(teamQuery.insertTeam, [name, league]);
  }

  /**
   * id를 기준으로 팀을 수정한다.
   * @param id 팀 id
   * @param name 팀 이름
   * @param league 팀 리그
   * @param isActive 팀 활성화 여부
   */
  public async updateTeamById(id: string, name: string, league: string, isActive: boolean): Promise<DMLResult> {
    const executeQueryResult = await execute<DMLResult>(teamQuery.updateTeamById, [name, league, isActive, id]);

    return executeQueryResult;
  }

  /**
   * id를 기준으로 팀을 삭제한다.
   * @param id 팀 id
   */
  public async deleteTeamById(id: string): Promise<DMLResult> {
    const executeQueryResult = await execute<DMLResult>(teamQuery.deleteTeamById, [id]);

    return executeQueryResult;
  }
}
