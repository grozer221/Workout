import { gql } from '@apollo/client';
import { userFragment } from '../users/queries';

export const authMe = gql`
query {
  auth {
    me {
      user {
        id
      }
      token
    }
  }
}
`;

export const loginMutation = gql`
  mutation{
    auth{
        login(input: {
          email: "smjthebest@gmail.com",
          password: "123",
        })
      {
        token
        user {
          email
        }
      }
    }
  }
`;
