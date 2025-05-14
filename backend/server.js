const https = require("https");
const express = require("express");
const fs = require("fs");
const env = require("dotenv").config();
const app = express();

app.use(express.json());

const port = process.env.PORT;

// Add HTTPS support
const options = {
  key: fs.readFileSync("path/to/ssl/key"),
  cert: fs.readFileSync("path/to/ssl/cert"),
};

https.createServer(options, app).listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ message: "Internal Server Error" });
});

// Routes and other middleware go here

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
