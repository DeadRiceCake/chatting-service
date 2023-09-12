export type JwtPayload = {
  id: string;
  userName: string;
  iat?: number;
  exp?: number;
};
