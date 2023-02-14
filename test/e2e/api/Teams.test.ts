import request from 'supertest';
import { teamSeeds } from '../../seed/TeamSeed';
import { TestApp } from '../util/TestApp';

const app = new TestApp().app;

describe('[GET] /api/teams', () => {
  it('200: Team 오름차순 조회에 성공', async () => {
    const OFFSET = 1;
    const LIMIT = 2;
    const SORT = 'asc';

    const response = await request(app).get(`/api/teams?offset=${OFFSET}&limit=${LIMIT}&sort=${SORT}`).expect(200);

    const { body } = response;
    expect(body.length).toBe(LIMIT);

    const teams = [...body];

    teams.forEach((team, i) => {
      expect(team.id).toBe(teamSeeds[i].id);
      expect(team.name).toBe(teamSeeds[i].name);
      expect(team.league).toBe(teamSeeds[i].league);
      expect(team.isActive).toBe(teamSeeds[i].isActive);
    });
  });

  it('200: Team 내림차순 조회에 성공', async () => {
    const OFFSET = 1;
    const LIMIT = 2;
    const SORT = 'desc';

    const response = await request(app).get(`/api/teams?offset=${OFFSET}&limit=${LIMIT}&sort=${SORT}`).expect(200);

    const { body } = response;

    expect(body.length).toBe(LIMIT);

    const teams = [...body];

    const teamSeedsOrderByIdDesc = [...teamSeeds].sort((a, b) => b.id - a.id);

    teams.forEach((team, i) => {
      expect(team.id).toBe(teamSeedsOrderByIdDesc[i].id);
      expect(team.name).toBe(teamSeedsOrderByIdDesc[i].name);
      expect(team.league).toBe(teamSeedsOrderByIdDesc[i].league);
      expect(team.isActive).toBe(teamSeedsOrderByIdDesc[i].isActive);
    });
  });
});
