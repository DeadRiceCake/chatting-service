import { Service, Inject } from 'typedi';
import { TeamRepository } from '../repository/TeamRepository';
import { Team } from '../model/entity/TeamModel';
import { DMLResult } from '../../../common/model/DMLResultModel';
import { CreateTeamDto, UpdateTeamDto } from '../model/dto/TeamDto';
import { Paging } from '../../../common/model/PagingModel';
import { RESPONSE_CODE } from '../../../config/StatusCode';
import { RESPONSE_STATUS } from '../../../config/Status';
import { RESPONSE_DESCRIPTION } from '../../../config/Description';
import { CustomError } from '../../../common/error/CustomError';

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
    const { offset, limit, sort } = paging;

    const allTeams =
      sort === 'desc'
        ? await this.teamRepository.selectAllTeamsOrderByIdDESC(offset, limit)
        : await this.teamRepository.selectAllTeamsOrderByIdASC(offset, limit);

    if (!allTeams.length) {
      throw new CustomError(
        RESPONSE_CODE.SUCCESS.NO_CONTENT,
        RESPONSE_STATUS.SUCCESS.NO_CONTENT,
        RESPONSE_DESCRIPTION.SUCCESS.NO_CONTENT,
      );
    }

    return allTeams;
  }

  /**
   * 팀을 생성한다
   * @param createTeamDto 팀 생성 DTO
   */
  public async createTeam(createTeamDto: CreateTeamDto): Promise<DMLResult> {
    return await this.teamRepository.insertTeam(createTeamDto.name, createTeamDto.league);
  }

  /**
   * id를 기준으로 팀을 수정한다.
   * @param id 팀 id
   * @param updateTeamDto 팀 수정 DTO
   */
  public async updateTeamById(id: string, updateTeamDto: UpdateTeamDto): Promise<DMLResult> {
    return await this.teamRepository.updateTeamById(
      id,
      updateTeamDto.name,
      updateTeamDto.league,
      updateTeamDto.isActive,
    );
  }

  public async deleteTeamById(id: string): Promise<DMLResult> {
    return await this.teamRepository.deleteTeamById(id);
  }
}
