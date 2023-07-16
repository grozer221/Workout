import { gql } from '@apollo/client';

export const userFragment = gql`
fragment UserFragment on UserType {
  id
  firstName
  lastName
  fullName
  email
  dateOfBirth
  createdAt
  updatedAt
}
`
