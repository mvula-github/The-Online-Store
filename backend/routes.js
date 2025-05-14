const express = require("express");
const router = express.Router();
const gateway = require("./gateway");
const { getContainer } = require("./cosmos");
const { validate, validationResult } = require("express-validator");
const { authenticate } = require("./auth/auth");

gateway.use("/api", router); // Add routes to the gateway

// POST /api/orders
router.post("/orders", authenticate, validate("order"), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const container = await getContainer();
  const { body } = req;
  const order = { ...body, id: Date.now().toString() };
  await container.items.create(order);
  res.status(201).send(order);
});

// POST /api/deliveries
router.post(
  "/deliveries",
  authenticate,
  validate("delivery"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const container = await getContainer();
    const { body } = req;
    const delivery = { ...body, id: Date.now().toString() };
    await container.items.create(delivery);
    res.status(201).send(delivery);
  }
);

// GET /api/orders
router.get("/orders", authenticate, async (req, res) => {
  const container = await getContainer();
  const orders = await container.items.readAll().fetchAll();
  res.send(orders);
});

// GET /api/deliveries
router.get("/deliveries", authenticate, async (req, res) => {
  const container = await getContainer();
  const deliveries = await container.items.readAll().fetchAll();
  res.send(deliveries);
});

module.exports = router;
