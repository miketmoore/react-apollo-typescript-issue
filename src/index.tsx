import * as React from "react";
import { render } from "react-dom";
import { CustomQuery } from "./CustomQuery";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { SchemaLink } from "apollo-link-schema";
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLFieldConfig,
  GraphQLString,
  GraphQLNonNull
} from "graphql";
import gql from "graphql-tag";

export const testQuery: GraphQLFieldConfig<any, any> = {
  type: new GraphQLObjectType({
    name: "Foobar",
    fields: {
      foo: {
        type: new GraphQLNonNull(GraphQLString)
      }
    }
  }),
  args: {},
  async resolve(
    _source
  ): Promise<{
    readonly foo: string;
  }> {
    return { foo: "bar" };
  }
};

const client = new ApolloClient({
  link: new SchemaLink({
    schema: new GraphQLSchema({
      query: new GraphQLObjectType({
        name: "Query",
        fields: () => ({ testQuery })
      })
    })
  }),
  cache: new InMemoryCache()
});

const query = gql(`query Example {
  testQuery {
    foo
  }
}`);

function App() {
  return (
    <ApolloProvider client={client}>
      <CustomQuery
        query={query}
        children={queryProps => {
          return <pre>{JSON.stringify(queryProps.data, undefined, 2)}</pre>;
        }}
      />
    </ApolloProvider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
