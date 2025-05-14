const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const logger = require("../logging");
const { getContainer, getUsersContainer } = require("../cosmos");

const secretKey = process.env.JWT_SECRET;
const expirationTime = process.env.JWT_EXPIRATION || "1h";

async function getUserByUsername(username) {
  const container = await getUsersContainer();
  const querySpec = {
    query: "SELECT * FROM c WHERE c.username = @username",
    parameters: [{ name: "@username", value: username }],
  };
  const { resources } = await container.items.query(querySpec).fetchAll();
  return resources[0];
}

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await getUserByUsername(username);
  if (!user) {
    return res.status(401).send({ message: "Invalid username or password" });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).send({ message: "Invalid username or password" });
  }
  const token = jwt.sign({ userId: user.id, role: user.role }, secretKey, {
    expiresIn: expirationTime,
  });
  res.send({ token });
};

const authenticate = async (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) {
    logger.warn("Access denied. No token provided.");
    return res
      .status(401)
      .send({ message: "Access denied. No token provided." });
  }
  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (ex) {
    logger.warn("Invalid token.");
    res.status(400).send({ message: "Invalid token." });
  }
};

module.exports = { login, authenticate };
