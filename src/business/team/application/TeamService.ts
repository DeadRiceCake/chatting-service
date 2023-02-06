import { Service, Inject } from 'typedi';
import { TeamRepository } from '../repository/TeamRepository';
import { Team } from '../model/TeamModel';
import { DMLResult } from '../../../common/model/DMLResultModel';

@Service()
export class TeamService {
  private teamRepository: TeamRepository;

  constructor(@Inject() teamRepository: TeamRepository) {
    this.teamRepository = teamRepository;
  }

  /**
   * 팀 목록을 조회한다.
   * @param offset offset
   * @param limit limit
   * @param sort 기본값은 id의 오름차순, desc면 id의 내림차순
   */
  public async getAllTeams(offset: number, limit: number, sort?: string): Promise<Team[]> {
    try {
      const allTeams = await this.teamRepository.selectAllTeams(offset, limit, sort);

      return allTeams;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * 팀을 생성한다
   * @param name 팀명
   * @param league 리그 명
   */
  public async createTeam(name: string, league: string): Promise<DMLResult> {
    try {
      const createTeamResult = await this.teamRepository.insertTeam(name, league);

      return createTeamResult;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
