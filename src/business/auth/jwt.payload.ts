export type JwtPayload = {
  id: number;
  userName: string;
  iat?: number;
  exp?: number;
};
