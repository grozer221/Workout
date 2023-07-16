export type loginData = {
  auth: {
    login: { token: string; user: { email: string } }
  }
}

export type meData = {
  auth: {
    me: {
      token: string;
      user: {
        email: string;
        firstName: string;
        lastName: string;
      }
    }
  }
}
