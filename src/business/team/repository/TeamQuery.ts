export const teamQuery = {
  selectTeamListOrderByIdASC: `
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
      id ASC
    LIMIT
      ?, ?
  `,
  selectTeamListOrderByIdDESC: `
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
      id DESC
    LIMIT
      ?, ?
  `,
  insertTeam: `
    INSERT INTO
      tmp.teams
      (name, league, isActive)
    VALUE
      (?, ?, 1)
  `,
};
