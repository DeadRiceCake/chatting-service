import { execute } from '../../../Database';
import { Service } from 'typedi';
import { Team } from '../model/TeamModel';

@Service()
export class TeamRepository {
  public async selectAllTeam(offset: number, limit: number, sort?: string): Promise<Team[]> {
    try {
      const query = `
        SELECT 
          id,
          name,
          league,
          (
            CASE 
            WHEN 
              t.isActive = 1
            THEN 
              true
            ELSE
              false
            end
          ) AS 'isActive'
        FROM 
          tmp.teams AS t
        WHERE
          isActive = true
        ORDER BY
          ${sort === 'desc' ? 'id DESC' : 'id ASC'}
        LIMIT
          ?, ?
      `;

      const executeQueryResult = await execute<Team[]>(query, [offset, limit]);
      return executeQueryResult;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
