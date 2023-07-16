import { User } from '../users/types';

export type loginData = {
  auth: {
    login: { token: string; user: { email: string } }
  }
}

export type authMeData = {
  auth: {
    me: AuthResponse
  }
}

export type AuthResponse = {
  user: User;
  token: string;
};
