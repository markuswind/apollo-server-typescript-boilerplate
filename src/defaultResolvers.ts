import { QueryResolvers, ResolversParentTypes } from './generated/graphql';

type DefaultResolver<Parent, Key extends keyof Parent> = (
  parent: Parent
) => Parent[Key];
type DefaultResolvers<Parent> = {
  [Property in keyof Parent]: DefaultResolver<Parent, Property>;
};

type ResolverOrDefaultResolver<
  Parent,
  Key extends keyof Parent,
  Resolver
> = Resolver extends undefined ? DefaultResolver<Parent, Key> : Resolver;
type TypeResolversOrDefaultResolvers<Parent, TypeResolvers> = {
  [Property in keyof Parent]: Property extends keyof TypeResolvers
    ? ResolverOrDefaultResolver<Parent, Property, TypeResolvers[Property]>
    : DefaultResolver<Parent, Property>;
};
type ResolversOrDefaultResolvers<ResolversType> = {
  [Property in keyof ResolversParentTypes]: Property extends keyof ResolversType
    ? TypeResolversOrDefaultResolvers<
        ResolversParentTypes[Property],
        ResolversType[Property]
      >
    : DefaultResolvers<Property>;
};

/*
This function adds validation for the default resolvers, it will make
typescipt tell you when you have to add a custom resolver since the default
one does not match the schema.

But why won't the default one match the schema?
Let's say your provider returns the Book object like this:
    {"name": "Hello", author: "Me", nextBook: 3}

Here `nextBook` is a foreign key to an object you want to fetch in a resolver.

So you add a custom type to the `mappers` in `codegen.yml`:
    { name: string, author: string, nextBook: number }

At this point, without this function, typescript will NOT warn you that
the default resolver returns the wrong type, i.e. `number` instead of `Book`.

You can make it a requirement to implement ALL resolvers, but that sucks.
Therfore this function was created to add the default resolvers to the type
so that you can check that it is assignable to the `Resolvers` type.
*/
export const addDefaultResolvers = <T>(
  resolvers: T
): ResolversOrDefaultResolvers<T> & { Query: QueryResolvers } => {
  // the default resolvers are added by apollo itself.
  // @ts-ignore
  return resolvers;
};
