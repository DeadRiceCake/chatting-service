import { Role } from './role.model';

export interface AccessTokenPayload {
  id: string;
  role: Role;
  exp?: number;
}
