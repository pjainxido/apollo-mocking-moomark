import { PostData } from './data.js';
import { ApolloServer, gql, makeExecutableSchema, MockList } from 'apollo-server';
import { GraphQLScalarType } from 'graphql';
import faker from 'faker';

const title = ['test', '마크타운데 관하여', 'about react', 'apollo'];
const author = []

const mocks = {
  Id: () => faker.datatype.uuid(),
  Int: () => faker.datatype.number(100),
  String: () => faker.name.firstName(),
  Date: () => faker.datatype.datetime(),
  PostListData: () => ({
    title: () => faker.random.arrayElement(title),
    author: () => faker.name.firstName(),
  }),
  Query: () => ({
    ping: () => 'pong',
    postlist: () => new MockList(100),
  }),
};

const typeDefs = gql`
  scalar Date
  type Query {
    ping: String
    postData: PostData!
    postlist: [PostListData]!
  }
  type PostData {
    id: ID!
    title: String!
    postDate: Date!
    editorName: String!
    content: String!
    tags: [String!]!
    description: String!
    like: Int!
    thumbNail: String
  }
  type PostListData {
    id: ID!
    title: String
    author: String
    postDate: Date
    tags: [String]
    description: String
    like: Int
    thumbNail: String
  }
`;


const server = new ApolloServer({
  typeDefs,
  mocks,
  mockEntireSchema: false,
});

server.listen(4004).then(({ url }) => {
  console.log(`Listening at ${url}`);
});
