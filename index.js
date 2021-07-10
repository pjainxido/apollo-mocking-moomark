const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    ping: String
  }
`;

const resolvers = {
  Query: {
    ping: () => "pong",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4004).then(({ url }) => {
  console.log(`Listening at ${url}`);
});