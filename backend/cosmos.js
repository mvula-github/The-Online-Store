const { CosmosClient } = require("@azure/cosmos");
const env = require("dotenv").config();
const endpoint = process.env.COSMOS_ENDPOINT;
const key = process.env.COSMOS_KEY;
const client = new CosmosClient({ endpoint, key });

const databaseId = process.env.COSMOS_DATABASE_ID;
const containerId = process.env.COSMOS_CONTAINER_ID;

async function getDatabase() {
  const { database } = await client.databases.createIfNotExists({
    id: databaseId,
  });
  return database;
}

async function getContainer() {
  const { container } = await getDatabase().containers.createIfNotExists({
    id: containerId,
  });
  return container;
}

async function getUsersContainer() {
  const database = await getDatabase();
  const { container } = await database.containers.createIfNotExists({
    id: "users",
  });
  return container;
}

module.exports = { getContainer, getUsersContainer };
