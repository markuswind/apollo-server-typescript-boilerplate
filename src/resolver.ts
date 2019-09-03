import { gql } from 'apollo-server';
import { IResolvers } from './generated/graphql';

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
export const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    book(id: Int!): Book
    books: [Book]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
export const resolvers: IResolvers = {
  Query: {
    book: (_, args, ctx) => ctx.dataSources.booksProvider.getBook(args),
    books: (_, __, ctx) => ctx.dataSources.booksProvider.getBooks()
  }
};
