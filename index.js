// Import ApolloServer from apollo-server to set up the GraphQL server
const { ApolloServer } = require("apollo-server"); 

// Import schema from graphql-import to load schema.graphql
const { importSchema } = require("graphql-import");

// Import custom EtherDataSource for resolving API data  
const EtherDataSource = require("./datasource/ethDatasource"); 

// Load schema from schema.graphql
const typeDefs = importSchema("./schema.graphql");

// Load environment variables
require("dotenv").config();

// Resolvers map schema fields to data source methods
const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => 
      // Call etherBalanceByAddress() on EtherDataSource
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>
      // Call totalSupplyOfEther() on EtherDataSource  
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>
      // Call getLatestEthereumPrice() on EtherDataSource
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>
      // Call getBlockConfirmationTime() on EtherDataSource
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  
  // Pass EtherDataSource instance to dataSources
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), 
  }),
});

// Set timeout and start server
server.timeout = 0;
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`); 
});
