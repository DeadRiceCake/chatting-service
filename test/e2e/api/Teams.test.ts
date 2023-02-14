import request from 'supertest';
import { teamSeeds } from '../../seed/TeamSeed';
import { TestApp } from '../util/TestApp';
// import app from '../util/TestApp';

const app = new TestApp().app;

describe('[GET] /api/teams', () => {
  it('200: Team 조회에 성공', async () => {
    const response = await request(app).get(`/api/teams?offset=1&limit=2`).expect(200);

    const { body } = response;
    expect(body.length).toBe(2);

    const teams = [...body];

    teams.forEach((team, i) => {
      expect(team.id).toBe(teamSeeds[i].id);
      expect(team.name).toBe(teamSeeds[i].name);
      expect(team.league).toBe(teamSeeds[i].league);
      expect(team.isActive).toBe(teamSeeds[i].isActive);
    });
  });
});
