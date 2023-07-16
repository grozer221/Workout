import { AuthResponse } from './auth/types';

export type BaseModel = {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type InitApp = {
  appTexts: {
    getTexts: {
      key: string;
      value: string;
    }[]
  }
  auth: {
    me: AuthResponse
  }
}
