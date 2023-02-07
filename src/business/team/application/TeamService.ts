import { Service, Inject } from 'typedi';
import { TeamRepository } from '../repository/TeamRepository';
import { Team } from '../model/entity/TeamModel';
import { DMLResult } from '../../../common/model/DMLResultModel';
import { CreateTeamDto, UpdateTeamDto } from '../model/dto/TeamDto';
import { Paging } from '../../../common/model/PagingModel';

@Service()
export class TeamService {
  private teamRepository: TeamRepository;

  constructor(@Inject() teamRepository: TeamRepository) {
    this.teamRepository = teamRepository;
  }

  /**
   * 팀 목록을 조회한다.
   * @param paging 페이징 DTO
   */
  public async getAllTeams(paging: Paging): Promise<Team[]> {
    try {
      const allTeams = await this.teamRepository.selectAllTeams(paging);

      return allTeams;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * 팀을 생성한다
   * @param createTeamDto 팀 생성 DTO
   */
  public async createTeam(createTeamDto: CreateTeamDto): Promise<DMLResult> {
    try {
      const createTeamResult = await this.teamRepository.insertTeam(createTeamDto);

      return createTeamResult;
    } catch (error) {
      console.error(error);
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
      const updateTeamByIdResult = await this.teamRepository.updateTeamById(id, updateTeamDto);

      return updateTeamByIdResult;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
