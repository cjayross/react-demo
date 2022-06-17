import { from, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const backend = new HttpLink({
  uri: '/api/graphql',
});

const client = new ApolloClient({
  link: from([backend]),
  cache: new InMemoryCache(),
});

export default client;
