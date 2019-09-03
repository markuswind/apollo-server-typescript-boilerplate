import { DataSource } from 'apollo-datasource';
import { QueryBookArgs } from './generated/graphql';

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    id: 0,
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling'
  },
  {
    id: 1,
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
];

// This is a (simple) data source which can be used for retrieving
// the sample collection of books. This dataSource is injected
// into the context of the apollo server, which makes it usable
// inside the resolvers.
export class BooksProvider extends DataSource {
  public async getBook(args: QueryBookArgs) {
    return books[args.id];
  }

  public async getBooks() {
    return books;
  }
}
