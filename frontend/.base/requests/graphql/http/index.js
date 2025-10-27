/* 
this code is for consume a GRAPHQL service with protocol HTTP.
WORK IN PROGRESS, this code is not fully implemented yet.
*/

// #region libraries
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
// #endregion


// #region utils
// #endregion


// #region main logic
const client = new ApolloClient({
    uri: 'https://ejemplo.com/graphql',
    cache: new InMemoryCache(),
});

client.query({
    query: gql`
        query {
            usuario(id: '1') {
                nombre
                edad
            }
        }
    `
}).then(response => console.log(response.data));
// #endregion