import { Request } from "express";

export interface LoginSessionInfo {
  id: string;
  loginSessionId: string;
  username: string;
}

export interface RequestWithUser extends Request {
  user: LoginSessionInfo;
}
