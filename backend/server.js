const https = require("https");
const express = require("express");
const fs = require("fs");
const env = require("dotenv").config();
const cors = require("cors");
const logger = require("./logging");
const rateLimiter = require("./middleware/rateLimiting");
const app = express();

app.use(express.json());

const port = process.env.PORT;

// Validate required environment variables
const requiredEnv = [
  "PORT",
  "JWT_SECRET",
  "COSMOS_ENDPOINT",
  "COSMOS_KEY",
  "COSMOS_DATABASE_ID",
  "COSMOS_CONTAINER_ID",
];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

// CORS setup - allow only trusted origins
const allowedOrigins = ["https://your-frontend-domain.com"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Apply rate limiter globally
app.use(rateLimiter);

// Add HTTPS support
const options = {
  key: fs.readFileSync("./cert/server.key"),
  cert: fs.readFileSync("./cert/server.cert"),
};

https.createServer(options, app).listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Replace error middleware to use Winston logger
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send({ message: "Internal Server Error" });
});

// Routes and other middleware go here
