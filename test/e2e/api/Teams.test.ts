import request from 'supertest';
import { teamSeeds } from '../../seed/TeamSeed';
import { TestApp } from '../util/TestApp';
import { TruncateTeamsTable } from '../util/TruncateTable';

const app = new TestApp().app;

afterAll(async () => {
  const truncateTeamsTable = new TruncateTeamsTable();
  await truncateTeamsTable.truncateTable('tmp.teams');
  await truncateTeamsTable.insertDatas();
  console.log('테이블 초기화 완료');
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
    const NAME = 'Sung Nam FC';
    const LEAGUE = 'K-League';

    const response = await request(app).post('/api/teams').send({ name: NAME, league: LEAGUE }).expect(201);

    const { body } = response;

    expect(body.additional_info.created_team.name).toBe(NAME);
    expect(body.additional_info.created_team.league).toBe(LEAGUE);
  });
});

describe('[PUT] /api/teams/:id', () => {
  it('200: Team 수정에 성공', async () => {
    const ID = 1;
    const NAME = 'Sung Nam FC';
    const LEAGUE = 'K-League';
    const IS_ACTIVE = true;

    const response = await request(app)
      .put(`/api/teams/${ID}`)
      .send({ name: NAME, league: LEAGUE, is_active: IS_ACTIVE })
      .expect(200);

    const { body } = response;

    expect(body.additional_info.updated_team.name).toBe(NAME);
    expect(body.additional_info.updated_team.league).toBe(LEAGUE);
    expect(body.additional_info.updated_team.is_active).toBe(IS_ACTIVE);
  });

  it('400: Team id가 존재하지 않아 수정에 실패', async () => {
    const ID = 100;
    const NAME = 'Sung Nam FC';
    const LEAGUE = 'K-League';
    const IS_ACTIVE = true;

    const response = await request(app)
      .put(`/api/teams/${ID}`)
      .send({ name: NAME, league: LEAGUE, is_active: IS_ACTIVE })
      .expect(400);

    const { body } = response;

    expect(body.additional_info).toBe('존재하지 않는 team id입니다.');
  });
});

describe('[DELETE] /api/teams/:id', () => {
  it('200: Team 삭제에 성공', async () => {
    const ID = 1;

    await request(app).delete(`/api/teams/${ID}`).expect(200);
  });
});
