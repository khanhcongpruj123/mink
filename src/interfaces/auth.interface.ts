import { Request } from "express";

export interface LoginSessionInfo {
  id: number;
  loginSessionId: string;
  username: string;
}

export interface RequestWithUser extends Request {
  user: LoginSessionInfo;
}
