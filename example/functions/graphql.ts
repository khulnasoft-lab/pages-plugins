import graphQLPlugin from "khulnasoft/pages-plugin-graphql";
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return "Hello, world!";
        },
      },
    },
  }),
});

export const onRequest: PagesFunction = graphQLPlugin({ schema, graphql });
