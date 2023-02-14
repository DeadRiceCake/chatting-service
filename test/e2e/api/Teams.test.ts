import request from 'supertest';
import { teamSeeds } from '../../seed/TeamSeed';
import { TestApp } from '../util/TestApp';
import { TruncateTeamsTable } from '../util/TruncateTable';

const app = new TestApp().app;

afterAll(async () => {
  const truncateTeamsTable = new TruncateTeamsTable();
  await truncateTeamsTable.truncateTable('tmp.teams');
  await truncateTeamsTable.insertDatas();
});

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

describe('[POST] /api/teams', () => {
  it('201: Team 생성에 성공', async () => {
    const name = 'Sung Nam FC';
    const league = 'K-League';

    const response = await request(app).post('/api/teams').send({ name, league }).expect(201);

    const { body } = response;

    expect(body.additional_info.created_team.name).toBe(name);
    expect(body.additional_info.created_team.league).toBe(league);
  });
});
