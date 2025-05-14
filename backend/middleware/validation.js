const { check, validationResult } = require("express-validator");

const validate = (type) => {
  switch (type) {
    case "order":
      return [
        check("customerName").isLength({ min: 1 }),
        check("orderTotal").isNumeric(),
      ];
    case "delivery":
      return [
        check("deliveryAddress").isLength({ min: 1 }),
        check("deliveryStatus").isIn(["pending", "shipped", "delivered"]),
      ];
    default:
      return [];
  }
};

module.exports = { validate };
