import { ApolloServer, gql,  MockList } from 'apollo-server';
import faker from 'faker';

const title = ['test', 'markdown에 관하여', 'about react', 'apollo'];


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
    post: () => new MockList(1),
    postlist: () => new MockList(100),
  }),
};

const typeDefs = gql`
  scalar Date
  type Query {
    ping: String
    post: [PostData]!
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

server.listen(4000).then(({ url }) => {
  console.log(`Listening at ${url}`);
});
