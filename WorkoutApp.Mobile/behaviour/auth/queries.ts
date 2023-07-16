import { gql } from '@apollo/client';
import { userFragment } from '../users/queries';

export const authMe = gql`
query {
  auth {
    me {
      user {
        ...UserFragment
      }
      token
    }
  }
}
${userFragment}
`;

export const authLogin = gql`
mutation ($input: AuthLoginInputType!){
  auth {
    login(input: $input) {
      token
      user {
        ...UserFragment
      }
    }
  }
}
${userFragment}
`;

export const registerLogin = gql`
mutation ($input: AuthRegisterInputType!){
  auth {
    register(input: $input) {
      token
      user {
        ...UserFragment
      }
    }
  }
}
${userFragment}
`;
