import { User } from '../users/types';

export type AuthMeData = {
  auth: {
    me: AuthResponse
  }
}

export type AuthLoginVars = {
  input: {
    email: string;
    password: string;
  }
}
export type AuthLoginData = {
  auth: {
    login: AuthResponse
  }
}

export type AuthRegisterVars = {
  input: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }
}
export type AuthRegisterData = {
  auth: {
    register: AuthResponse
  }
}

export type AuthResponse = {
  user: User;
  token: string;
};
