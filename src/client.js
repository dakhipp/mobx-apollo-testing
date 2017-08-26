import ApolloClient, { createNetworkInterface } from 'apollo-client';

const client = new ApolloClient({
	networkInterface: createNetworkInterface({
    uri: 'https://1jzxrj179.lp.gql.zone/graphql',
  }),
});

export default client;
