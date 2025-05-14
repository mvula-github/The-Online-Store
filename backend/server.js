const express = require("express");
const app = express();
const env = require("dotenv").config();

app.use(express.json());

const port = process.env.PORT;

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ message: "Internal Server Error" });
});

// Routes and other middleware go here

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
