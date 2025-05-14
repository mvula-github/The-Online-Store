const { CosmosClient } = require("@azure/cosmos");
const env = require("dotenv").config();

const cosmosClient = new CosmosClient({
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY,
});

const database = cosmosClient.database(process.env.COSMOS_DATABASE_NAME);
const ordersContainer = database.container(process.env.COSMOS_CONTAINER_NAME);
