const express = require("express");
const app = express();

const env = require("dotenv").config();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
