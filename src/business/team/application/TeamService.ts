import { Service, Inject } from 'typedi';
import { TeamRepository } from '../repository/TeamRepository';
import { Team } from '../model/entity/TeamModel';
import { CreateTeamDto, UpdateTeamDto } from '../model/dto/TeamDto';
import { Paging } from '../../../common/model/PagingModel';
import { RESPONSE_CODE } from '../../../config/StatusCode';
import { RESPONSE_STATUS } from '../../../config/Status';
import { RESPONSE_DESCRIPTION } from '../../../config/Description';
import { CustomError } from '../../../common/error/CustomError';
import { CreateTeamResponse, DeleteTeamResponse, UpdateTeamResponse } from '../response/TeamResponse';

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
  public async getAllTeams(pagingDto: Paging): Promise<Team[]> {
    const paging = new Paging(pagingDto.offset, pagingDto.limit, pagingDto.sort);
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
   * @returns 생성된 팀
   */
  public async createTeam(createTeamDto: CreateTeamDto): Promise<CreateTeamResponse> {
    const { name, league } = createTeamDto;

    await this.teamRepository.insertTeam(name, league);

    return new CreateTeamResponse(name, league);
  }

  /**
   * id를 기준으로 팀을 수정한다.
   * @param id 팀 id
   * @param updateTeamDto 팀 수정 DTO
   */
  public async updateTeamById(id: string, updateTeamDto: UpdateTeamDto): Promise<UpdateTeamResponse> {
    const { name, league, is_active } = updateTeamDto;

    const updatedTeamResult = await this.teamRepository.updateTeamById(id, name, league, is_active);

    if (!updatedTeamResult.affectedRows) {
      throw new CustomError(
        RESPONSE_CODE.CLIENT_ERROR.INVALID_ARGUMENT,
        RESPONSE_STATUS.CLIENT_ERROR.INVALID_ARGUMENT,
        RESPONSE_DESCRIPTION.CLIENT_ERROR.INVALID_ARGUMENT,
        '존재하지 않는 team id입니다.',
      );
    }

    return new UpdateTeamResponse(id, name, league, is_active);
  }

  /**
   * id를 기준으로 팀을 삭제한다.
   * @param id 삭제할 팀 id
   * @returns 삭제 결과
   */
  public async deleteTeamById(id: string): Promise<DeleteTeamResponse> {
    await this.teamRepository.deleteTeamById(id);

    return new DeleteTeamResponse();
  }
}
