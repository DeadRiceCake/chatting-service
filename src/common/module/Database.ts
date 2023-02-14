import { createPool, Pool } from 'mysql';
import { DB_CONFIG } from '../../config/Env';

let pool: Pool;

/**
 * 서버 가동될 동안 사용될 DB풀 생성
 */
export const createDBPool = () => {
  try {
    pool = createPool({
      connectionLimit: DB_CONFIG.DB_CONNECTION_LIMIT,
      host: DB_CONFIG.DB_HOST,
      user: DB_CONFIG.DB_USER,
      password: DB_CONFIG.DB_PASSWORD,
      database: DB_CONFIG.DB_DATABASE,
      charset: 'utf8mb4',
    });
  } catch (error) {
    console.log('[mysql.connector][init][Error]: ', error);
    throw new Error('풀 생성에 실패하였습니다');
  }
};

/**
 * 쿼리문 실행
 *
 * @param {string} query - 쿼리문
 * @param {string[] | object} params - 쿼리문 ? 안에 들어갈 파라미터들
 * in the query
 */
export const execute = <T>(query: string, params: string[] | object): Promise<T> => {
  try {
    if (!pool) throw new Error('풀이 생성되지 않았습니다. 풀이 생성되었는지 확인해주세요.');

    return new Promise<T>((resolve, reject) => {
      pool.query(query, params, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  } catch (error) {
    console.log('[mysql.connector][execute][Error]: ', error);
    throw new Error('쿼리문 실행 실패');
  }
};

/**
 * 풀 해제
 */
export const release = () => {
  pool.end();
};
