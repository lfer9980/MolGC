/* 
this file config the apollo client to accept or split services that use http protocol and web sockets protocols.
WORK IN PROGRESS, this code is not fully implemented yet.
*/
//#region libraries
import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
// #endregion 


// #region utils
// #endregion


// #region main logic
const httpLink = new HttpLink({
	uri: 'https://mi-servidor.com/graphql',
});

const wsLink = new GraphQLWsLink(
	createClient({
		url: 'wss://mi-servidor.com/graphql',
	})
);

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		);
	},
	wsLink,
	httpLink
);

const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache(),
});

export default client;
// #endregion