import { Request } from "express";
import { UserRole } from "../constants/user-roles.enum";

export interface RequestUser {
  id: number;
  email: string;
  role: UserRole;
}

export interface CustomRequest extends Request {
  user: RequestUser;
}

export interface JwtPayload {
  sub: number;
  email: string;
  role: string;
}
