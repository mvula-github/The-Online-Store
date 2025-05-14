const express = require("express");
const router = express.Router();
const { getContainer } = require("./cosmos");

router.get("/orders", async (req, res) => {
  try {
    const container = await getContainer();
    const orders = await container.items.readAll().fetchAll();
    res.send(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Other routes go here

module.exports = router;
