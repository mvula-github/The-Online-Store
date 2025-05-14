const roles = {
  admin: [
    "createOrder",
    "updateOrder",
    "deleteOrder",
    "createDelivery",
    "updateDelivery",
    "deleteDelivery",
  ],
  user: ["createOrder", "updateOrder", "deleteOrder"],
};

const hasPermission = (role, permission) => {
  return roles[role].includes(permission);
};

module.exports = { hasPermission };
