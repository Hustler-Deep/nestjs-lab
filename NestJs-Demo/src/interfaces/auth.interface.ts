import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    id: number;
    email: string;
    role: string;
  };
}

export interface JwtPayload {
  sub: number;
  email: string;
  role: string;
}
