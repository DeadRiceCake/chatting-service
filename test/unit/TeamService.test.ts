import 'reflect-metadata';
import { TeamService } from '../../src/business/team/application/TeamService';
import { TeamRepository } from '../../src/business/team/repository/TeamRepository';
import { teamSeeds } from '../seed/TeamSeed';
import { createDBPool, release } from '../../src/common/module/Database';
import { TruncateTeamsTable } from '../e2e/util/TruncateTable';
import { RESPONSE_STATUS } from '../../src/config/Status';
import { RESPONSE_DESCRIPTION } from '../../src/config/Description';
import { CustomError } from '../../src/common/error/CustomError';

describe('TeamService', () => {
  const teamRepository = new TeamRepository();
  const teamService = new TeamService(teamRepository);

  beforeAll(() => createDBPool());

  afterAll(async () => {
    const truncateTeamsTable = new TruncateTeamsTable();
    await truncateTeamsTable.truncateTable('tmp.teams');
    await truncateTeamsTable.insertDatas();
    release();
  });

  it('getAllTeams 팀 목록을 오름차순으로 조회한다.', async () => {
    const paging = { offset: 1, limit: 5, sort: 'asc' };

    const allTeams = await teamService.getAllTeams(paging);

    allTeams.forEach((team, i) => {
      expect(team.id).toBe(teamSeeds[i].id);
      expect(team.name).toBe(teamSeeds[i].name);
      expect(team.league).toBe(teamSeeds[i].league);
      expect(team.isActive).toBe(teamSeeds[i].isActive);
    });
  });

  it('getAllTeams 팀 목록을 내림차순으로 조회한다.', async () => {
    const paging = { offset: 1, limit: 5, sort: 'desc' };

    const allTeams = await teamService.getAllTeams(paging);

    const teamSeedsOrderByIdDesc = [...teamSeeds].sort((a, b) => b.id - a.id);

    allTeams.forEach((team, i) => {
      expect(team.id).toBe(teamSeedsOrderByIdDesc[i].id);
      expect(team.name).toBe(teamSeedsOrderByIdDesc[i].name);
      expect(team.league).toBe(teamSeedsOrderByIdDesc[i].league);
      expect(team.isActive).toBe(teamSeedsOrderByIdDesc[i].isActive);
    });
  });

  it('getAllTeams 조회된 팀이 없을 경우 커스텀 에러를 반환한다', async () => {
    const paging = { offset: 100, limit: 5 };

    await expect(teamService.getAllTeams(paging)).rejects.toBeInstanceOf(CustomError);
  });

  it('createTeam 팀을 생성한다', async () => {
    const createTeamDto = {
      name: 'Sung Nam FC',
      league: 'K-League',
    };

    const createdTeam = await teamService.createTeam(createTeamDto);

    expect(createdTeam.status).toBe(RESPONSE_STATUS.SUCCESS.CREATED);
    expect(createdTeam.message).toBe(RESPONSE_DESCRIPTION.SUCCESS.CREATED);
    expect(createdTeam.data).toEqual({
      created_team: { name: createTeamDto.name, league: createTeamDto.league },
    });
  });

  it('updateTeamById id를 기준으로 팀을 수정한다', async () => {
    const ID = '1';
    const updateTeamDto = {
      name: 'Sung Nam FC',
      league: 'K-League',
      is_active: true,
    };

    const updatedTeam = await teamService.updateTeamById(ID, updateTeamDto);

    expect(updatedTeam.status).toBe(RESPONSE_STATUS.SUCCESS.OK);
    expect(updatedTeam.message).toBe(RESPONSE_DESCRIPTION.SUCCESS.OK);
    expect(updatedTeam.data).toEqual({
      updated_team: {
        id: ID,
        name: updateTeamDto.name,
        league: updateTeamDto.league,
        is_active: updateTeamDto.is_active,
      },
    });
  });

  it('updateTeamById id를 기준으로 팀을 수정할 때, id가 존재하지 않을 경우 커스텀 에러를 반환한다', async () => {
    const ID = '100';
    const updateTeamDto = {
      name: 'Sung Nam FC',
      league: 'K-League',
      is_active: true,
    };

    await expect(teamService.updateTeamById(ID, updateTeamDto)).rejects.toBeInstanceOf(CustomError);
  });
});
