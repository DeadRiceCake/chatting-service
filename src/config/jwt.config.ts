export const jwtConfig = {
  accessTokenSecret: String(process.env.JWT_ACCESS_SECRET),
  accessTokenExpiresIn: '1d',
  refreshTokenSecret: String(process.env.JWT_REFRESH_SECRET),
  refreshTokenExpiresIn: 1000 * 60 * 60 * 24 * 30,
};
