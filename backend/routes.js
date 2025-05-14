const express = require("express");
const router = express.Router();
const gateway = require("./gateway");
const { getContainer } = require("./cosmos");
const { validate } = require("express-validator");

gateway.use("/api", router); // Add routes to the gateway

// POST /api/orders
router.post("/orders", validate("order"), async (req, res) => {
  const container = await getContainer();
  const { body } = req;
  const order = { ...body, id: Date.now().toString() };
  await container.items.create(order);
  res.status(201).send(order);
});

// POST /api/deliveries
router.post("/deliveries", validate("delivery"), async (req, res) => {
  const container = await getContainer();
  const { body } = req;
  const delivery = { ...body, id: Date.now().toString() };
  await container.items.create(delivery);
  res.status(201).send(delivery);
});

// GET /api/orders
router.get("/orders", async (req, res) => {
  const container = await getContainer();
  const orders = await container.items.readAll().fetchAll();
  res.send(orders);
});

// GET /api/deliveries
router.get("/deliveries", async (req, res) => {
  const container = await getContainer();
  const deliveries = await container.items.readAll().fetchAll();
  res.send(deliveries);
});

module.exports = router;
