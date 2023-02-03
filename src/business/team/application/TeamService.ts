import { Service, Inject } from 'typedi';
import { TeamRepository } from '../repository/TeamRepository';
import { Team } from '../model/TeamModel';

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
  public async getAllTeam(offset: number, limit: number, sort?: string): Promise<Team[]> {
    try {
      const allTeams = await this.teamRepository.selectAllTeam(offset, limit, sort);

      return allTeams;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
