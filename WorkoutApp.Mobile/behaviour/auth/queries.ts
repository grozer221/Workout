import { gql } from '@apollo/client';

export const meQuery = gql`
query {
  auth {
    me {
      user{
        email
        firstName
        lastName
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
