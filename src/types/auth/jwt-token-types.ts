import { JwtPayload } from 'jwt-decode';

export interface CustomJwtToken extends JwtPayload {
  realm_access?: { roles: string[] };
  userType?: string;
  email?: string;
  name?: string;
  sub?: string;
  preferred_username?: string;
}
