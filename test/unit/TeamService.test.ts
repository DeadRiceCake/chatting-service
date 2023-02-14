import 'reflect-metadata';
import { TeamService } from '../../src/business/team/application/TeamService';
import { TeamRepository } from '../../src/business/team/repository/TeamRepository';
import { teamSeeds } from '../seed/TeamSeed';
import { createDBPool, release } from '../../src/common/module/Database';
import { TruncateTeamsTable } from '../e2e/util/TruncateTable';

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
});
