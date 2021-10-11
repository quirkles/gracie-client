import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, ApolloLink, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {setContext} from '@apollo/client/link/context';

const uri = 'http://localhost:8800/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));

  const auth = setContext((operation, context) => {
    // eslint-disable-next-line max-len
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNiZTdmYTE3LTg1NDItNDAwMy05OTVlLWVlZmUwY2ExZGJkMiIsImlhdCI6MTYzMzkwODgzNywiZXhwIjoxNjM5MDkyODM3fQ.l_rC9auYy7tZomYGa0YLk8TgqfU820csk5F4QHvdgHQ';

    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
  });

  const link = ApolloLink.from([basic, auth, httpLink.create({uri})]);
  const cache = new InMemoryCache();

  return {
    link,
    cache,
  };
}

@NgModule({
  imports: [],
  exports: [],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
