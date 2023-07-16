import { gql } from '@apollo/client';

export const getAppTexts = gql`
query {
  appTexts {
    getTexts {
      key
      value
    }
  }
}
`;
