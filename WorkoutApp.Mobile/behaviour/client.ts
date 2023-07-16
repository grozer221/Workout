import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { asyncStorageGetItem } from '../utils/asyncStorageUtils';
import { createUploadLink } from 'apollo-upload-client';

const httpsLink = createUploadLink({
  uri: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://10.0.2.2:5213/graphql'
    : '/graphql',
  credentials: 'include',
});

const authLink = setContext(async (_, {headers}) => ({
  headers: {
    ...headers,
    authorization: await asyncStorageGetItem('AuthToken'),
    'Access-Control-Allow-Origin': '',
  },
  link: httpsLink,
}));

export const client = new ApolloClient({
  link: authLink.concat(httpsLink),
  cache: new InMemoryCache(),
});
