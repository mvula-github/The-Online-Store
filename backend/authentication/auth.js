const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const secretKey = "your-secret-key";
const expirationTime = "1h";

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
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .send({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send({ message: "Invalid token." });
  }
};

module.exports = { login, authenticate };
