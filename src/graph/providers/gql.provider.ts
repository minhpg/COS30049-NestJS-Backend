import neo4j from 'neo4j-driver';
import { Neo4jGraphQL } from '@neo4j/graphql';
// import { Neo4jGraphQLAuthJWKSPlugin } from '@neo4j/graphql-plugin-auth';
import { typeDefs } from '../type-defs';
export const gqlProviderFactory = async () => {
  const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;

  const driver = neo4j.driver(
    NEO4J_URI,
    neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD),
  );

  // Define GraphQL schema and provide db driver
  try {
    const neoSchema = new Neo4jGraphQL({
      typeDefs,
      driver,
    });
  
    const schema = await neoSchema.getSchema();
    await neoSchema.assertIndexesAndConstraints({
      options: { create: true },
    });
  
    return {
      debug: true,
      playground: true,
      introspection: true,
      schema
    };
  }
  catch(e){
    console.log(e)
    throw e
  }
};
